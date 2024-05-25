import React from "react";

function SummaryBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded border-2 text-sm tracking border-tertiary w-fit spaced-x-sm spaced-y-xs font-gopher">
      {children}
    </div>
  );
}

function Unit({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-merchant text-xl leading-[0.5em]">{children}</span>
  );
}

function Details({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <details className=" spaced-y-md border-b-2 border-tertiary no-marker">
      <summary className="text-tertiary font-merchant text-xl uppercase tracking-widest flex justify-between">
        {label}
        <i className="bi bi-plus-lg"></i>
      </summary>
      <div className="spaced-t-sm flex flex-wrap gap-spaced-xs">{children}</div>
    </details>
  );
}

export function ProductDetails({
  details,
}: {
  details?: {
    nutritionalFacts?: {
      content: string;
      value: string;
    }[];
    ingredients?: string[];
    allergens?: string[];
    awards?: string[];
  };
}) {
  return (
    <div className="border-t-2 border-tertiary">
      {details?.nutritionalFacts?.length ? (
        <Details label="Nutritional Facts">
          {details?.nutritionalFacts.map((fact, index) => {
            return (
              <SummaryBadge key={index}>
                {fact.content}:
                <Unit>
                  {"  "}
                  {fact.value}
                </Unit>
              </SummaryBadge>
            );
          })}
        </Details>
      ) : null}
      <Details label="Ingredients">
        {details?.ingredients?.length ? (
          <>
            {details?.ingredients?.map((ingredient, index) => {
              return <SummaryBadge key={index}>{ingredient}</SummaryBadge>;
            })}
          </>
        ) : (
          <SummaryBadge>No Ingredients Data</SummaryBadge>
        )}
      </Details>
      <Details label="Allergens">
        {details?.allergens?.length ? (
          <>
            {details?.allergens?.map((allergen, index) => {
              return <SummaryBadge key={index}>{allergen}</SummaryBadge>;
            })}
          </>
        ) : (
          <SummaryBadge>No Allergens</SummaryBadge>
        )}
      </Details>
    </div>
  );
}
