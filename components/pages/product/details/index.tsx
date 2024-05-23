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

export function ProductDetails() {
  return (
    <div className="border-t-2 border-tertiary">
      <Details label="Nutritional Facts">
        <SummaryBadge>
          Serving Size:
          <Unit>{"  "}33g</Unit>
        </SummaryBadge>
        <SummaryBadge>
          Calories:
          <Unit>{"  "}171g</Unit>
        </SummaryBadge>
        <SummaryBadge>
          Sat Fat:
          <Unit>{"  "}4g</Unit>
        </SummaryBadge>
        <SummaryBadge>
          Trans Fat:
          <Unit>{"  "}0g</Unit>
        </SummaryBadge>
        <SummaryBadge>
          Cholesterol:
          <Unit>{"  "}0g</Unit>
        </SummaryBadge>
        <SummaryBadge>
          Sodium:
          <Unit>{"  "}172mg</Unit>
        </SummaryBadge>
        <SummaryBadge>
          Total Carbohydrate:
          <Unit>{"  "}14g</Unit>
        </SummaryBadge>
        <SummaryBadge>
          Sugar:
          <Unit>{"  "}0g</Unit>
        </SummaryBadge>
        <SummaryBadge>
          Protein:
          <Unit>{"  "}5g</Unit>
        </SummaryBadge>
        <SummaryBadge>
          Vit C:
          <Unit>{"  "}5mg</Unit>
        </SummaryBadge>
      </Details>
      <Details label="Ingredients">
        <SummaryBadge>Oyster Mushroom</SummaryBadge>
        <SummaryBadge>Cassava Flour</SummaryBadge>
        <SummaryBadge>Coconut Oil</SummaryBadge>
        <SummaryBadge>Salt</SummaryBadge>
        <SummaryBadge>Pepper</SummaryBadge>
        <SummaryBadge>Garlic Powder</SummaryBadge>
      </Details>
      <Details label="Allergens">
        <SummaryBadge>No Allergens</SummaryBadge>
      </Details>
    </div>
  );
}
