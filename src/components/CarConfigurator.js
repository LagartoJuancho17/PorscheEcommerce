"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

function getImageSrc(image) {
  if (!image) return "/images/products/dummy.webp";
  if (image.startsWith("/")) return image;
  return `/images/products/${image}`;
}

function buildDefaultSelections(customizationOptions) {
  if (!customizationOptions?.length) return {};
  return Object.fromEntries(
    customizationOptions.map((group) => [group.name, group.options[0]])
  );
}

export default function CarConfigurator({ product }) {
  const [selectedOptions, setSelectedOptions] = useState(() =>
    buildDefaultSelections(product.customizationOptions)
  );
  const [activeThumb, setActiveThumb] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const additionalPrice = Object.values(selectedOptions).reduce(
    (sum, opt) => sum + (opt?.price || 0),
    0
  );
  const totalPrice = product.price + additionalPrice;

  // Find the variant that matches current selections
  const variantImages = useMemo(() => {
    if (!product.variants?.length) return null;
    const colorKey = selectedOptions["Color exterior"]?.variantKey;
    const rinKey = selectedOptions["Rines"]?.variantKey;
    const aleronKey = selectedOptions["Alerón"]?.variantKey;
    const match = product.variants.find(
      (v) =>
        v.colorKey === colorKey &&
        v.rinKey === rinKey &&
        v.aleronKey === aleronKey
    );
    return match?.images ?? null;
  }, [selectedOptions, product.variants]);

  const allImages = variantImages?.length
    ? variantImages.map(getImageSrc)
    : product.images?.length
    ? product.images.map(getImageSrc)
    : [getImageSrc(product.image)];

  const safeThumb = Math.min(activeThumb, allImages.length - 1);
  const mainImage = allImages[safeThumb];

  function handleSelect(groupName, option) {
    setSelectedOptions((prev) => {
      const isSame = prev[groupName]?.label === option.label;
      if (isSame) return prev;
      return { ...prev, [groupName]: option };
    });
  }

  const hasOptions = product.customizationOptions?.length > 0;

  return (
    <div className="bg-white">
      {/* Top bar — fixed below the navbar (h-14 = 3.5rem) */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-white border-b border-gray-100 flex items-center justify-between px-8 h-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors"
        >
          <span className="text-lg leading-none">←</span>
          <span className="text-[10px] tracking-[0.3em] uppercase">Volver</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-900">
            USD {totalPrice.toLocaleString()}
          </span>
          <button
            onClick={() => setShowSummary(true)}
            className="px-5 py-1.5 border border-gray-300 text-[10px] tracking-[0.25em] uppercase hover:border-gray-700 transition-colors"
          >
            Resumen
          </button>
          <button className="px-5 py-1.5 bg-black text-white text-[10px] tracking-[0.25em] uppercase hover:bg-gray-800 transition-colors">
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Main layout — navbar (3.5rem) + topbar (3rem) = 6.5rem */}
      <div className="flex h-[calc(100vh-6.5rem)] mt-26">

        {/* Left: image viewer */}
        <div className="w-[60%] flex flex-col bg-[#f7f7f7]">
          <div className="flex-1 relative min-h-0">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-contain p-10"
              priority
            />
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 px-6 py-3 border-t border-gray-200 bg-white overflow-x-auto shrink-0">
            {allImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={`relative w-16 h-11 shrink-0 overflow-hidden border-2 transition-all ${
                  safeThumb === i
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-contain bg-[#f7f7f7]"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: config panel */}
        <div className="w-[40%] overflow-y-auto border-l border-gray-100">
          <div className="p-10">

            {/* Model header */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <h1 className="text-2xl font-light tracking-wide">
                  {product.name}
                </h1>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 tracking-widest">
                  2025
                </span>
              </div>
              {product.description && (
                <p className="text-sm text-gray-400 leading-relaxed mt-2">
                  {product.description}
                </p>
              )}
              {product.categories?.length > 0 && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {product.categories.map((cat) => (
                    <span
                      key={cat._id ?? cat}
                      className="text-[10px] text-gray-400 tracking-widest uppercase border border-gray-200 px-3 py-1"
                    >
                      {cat.name ?? cat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 mb-8" />

            {/* Customization options */}
            {hasOptions ? (
              product.customizationOptions.map((group) => (
                <OptionGroup
                  key={group.name}
                  group={group}
                  selected={selectedOptions[group.name]}
                  onSelect={(opt) => handleSelect(group.name, opt)}
                />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-[10px] tracking-[0.4em] uppercase text-gray-300 mb-3">
                  Personalizacion
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Las opciones de configuracion<br />seran añadidas proximamente.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Summary overlay */}
      {showSummary && (
        <SummaryPanel
          product={product}
          selectedOptions={selectedOptions}
          totalPrice={totalPrice}
          mainImage={mainImage}
          onClose={() => setShowSummary(false)}
        />
      )}
    </div>
  );
}

function SummaryPanel({ product, selectedOptions, totalPrice, mainImage, onClose }) {
  const entries = Object.entries(selectedOptions);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 shrink-0">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-1">
              Configuracion
            </p>
            <h2 className="text-lg font-light">{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-black transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Car preview image */}
        <div className="relative w-full aspect-video bg-[#f7f7f7] shrink-0">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain p-6"
          />
        </div>

        {/* Selected options */}
        <div className="flex-1 px-8 py-6">
          {entries.length === 0 ? (
            <p className="text-sm text-gray-300 text-center py-8">
              No hay opciones seleccionadas.
            </p>
          ) : (
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-5">
                Opciones seleccionadas
              </p>
              {entries.map(([groupName, option]) => (
                <div key={groupName} className="flex items-center gap-4 py-3 border-b border-gray-50">
                  {/* Option thumbnail */}
                  <div className="relative w-14 h-14 shrink-0 bg-gray-50 overflow-hidden">
                    {option.image ? (
                      <Image
                        src={getImageSrc(option.image)}
                        alt={option.label}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </div>

                  {/* Option info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
                      {groupName}
                    </p>
                    <p className="text-sm font-light text-gray-900 mt-0.5">
                      {option.label}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 text-right">
                    {option.price > 0 ? (
                      <p className="text-sm text-gray-500">
                        +USD {option.price.toLocaleString()}
                      </p>
                    ) : (
                      <p className="text-[10px] text-gray-300 tracking-widest uppercase">
                        Incluido
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total + CTA */}
        <div className="px-8 py-6 border-t border-gray-100 shrink-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">
              Total
            </p>
            <p className="text-xl font-light">
              USD {totalPrice.toLocaleString()}
            </p>
          </div>
          <button className="w-full bg-black text-white text-[11px] tracking-[0.3em] uppercase py-4 hover:bg-gray-800 transition-colors">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

function OptionGroup({ group, selected, onSelect }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full mb-4"
      >
        <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase">
          {group.name}
        </h2>
        <span className="text-gray-300 text-xs">{open ? "∧" : "∨"}</span>
      </button>

      {open && (
        <div>
          <div className="grid grid-cols-3 gap-2">
            {group.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => onSelect(opt)}
                className={`relative aspect-square border-2 overflow-hidden transition-all ${
                  selected?.label === opt.label
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                {opt.image ? (
                  <Image
                    src={getImageSrc(opt.image)}
                    alt={opt.label}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-100 text-[10px] text-gray-400 p-1 text-center">
                    {opt.label}
                  </div>
                )}
                {opt.price > 0 && (
                  <span className="absolute bottom-0 right-0 bg-black/60 text-white text-[9px] px-1 py-0.5">
                    +${opt.price.toLocaleString()}
                  </span>
                )}
              </button>
            ))}
          </div>

          {selected && (
            <p className="text-[11px] text-gray-400 mt-3">
              {selected.label}
              {selected.price > 0 && (
                <span className="ml-1 text-gray-500">
                  (+USD {selected.price.toLocaleString()})
                </span>
              )}
            </p>
          )}
        </div>
      )}

      <div className="border-t border-gray-100 mt-6" />
    </div>
  );
}
