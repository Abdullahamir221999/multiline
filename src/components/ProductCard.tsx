import Image from "next/image";
import Link from "next/link";

import type { CatalogProduct } from "@/lib/products";
import { cn } from "@/helpers/cn";

type ProductCardProps = {
  product: CatalogProduct;
  className?: string;
};

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const isQuote = product.price === "Request Quote";
  const href = product.available
    ? `/products/${product.slug}`
    : `/products/${product.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col border border-line bg-surface transition-colors duration-300 hover:border-line-strong",
        className
      )}
    >
      <div className="relative m-3 mb-0 aspect-[4/3] overflow-hidden bg-image-well">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          style={{
            objectPosition: product.imagePosition ?? "center",
          }}
        />

        {/* <div className="absolute left-4 top-4">
          <span
            className={cn(
              "inline-flex border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.075em] backdrop-blur-sm",
              product.category === "AC"
                ? "border-brand/20 bg-accent/95 text-brand"
                : "border-brand bg-brand/95 text-accent"
            )}
          >
            {product.category === "AC" ? "AC Charging" : "DC Fast Charging"}
          </span>
        </div> */}

        {/* {product.tag ? (
          <div className="absolute right-4 top-4">
            <span className="inline-flex border border-line bg-surface/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.075em] text-ink-soft backdrop-blur-sm">
              {product.tag}
            </span>
          </div>
        ) : null} */}

        {/* {!product.available ? (
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex border border-line bg-paper/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.075em] text-ink-soft backdrop-blur-sm">
              Coming soon
            </span>
          </div>
        ) : null} */}

        {/* <div className="absolute bottom-4 right-4 flex h-[42px] w-[42px] items-center justify-center bg-surface text-[18px] text-brand transition-transform duration-300 group-hover:translate-x-1">
          →
        </div> */}
      </div>

      <div className="flex flex-1 flex-col px-6 pb-7 pt-6 lg:px-7">
        <div className="flex items-center justify-between gap-6">
          <span className="text-[12px] font-semibold uppercase tracking-[0.065em] text-brand">
            {product.power}
          </span>
          <span className="text-right text-[11px] font-medium uppercase tracking-[0.055em] text-ink-faint">
            {product.application}
          </span>
        </div>

        <h3 className="font-display mt-5 text-[29px] font-medium leading-[1.05] tracking-[-0.025em] lg:text-[32px]">
          {product.name}
        </h3>

        <p className="mt-3 max-w-[390px] text-[13px] leading-[1.65] text-ink-soft">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-7 border-t border-line pt-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-ink-faint">
              Connector
            </p>
            <p className="mt-1.5 text-[13px] font-medium">{product.connector}</p>
          </div>

          <div className="h-8 w-px bg-line" />

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-ink-faint">
              Output
            </p>
            <p className="mt-1.5 text-[13px] font-medium">{product.power}</p>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between border-t border-line pt-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-ink-faint">
                {isQuote ? "Commercial enquiry" : "Price"}
              </p>
              <p className="mt-2 text-[16px] font-semibold tracking-[-0.02em]">
                {product.price}
              </p>
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.07em] text-brand">
              {product.available
                ? isQuote
                  ? "View system →"
                  : "View product →"
                : "Preview →"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
