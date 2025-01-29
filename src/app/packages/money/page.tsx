import React from "react";
import { PageProps } from "@/models";
import { CodeBlock } from "@/components/atoms";
import { MarkdownContent } from "@/components/molecules";

const packageData = {
  name: "@enesbaspinar/money",
  image: "/logo/packages/money.png",
  description:
    "A comprehensive library for precise monetary calculations and customizable locale-based currency formatting.",
  version: "v1.0.0",
  installation: `npm i -g money`,
  content: [
    {
      title: "Installation",
      items: [
        {
          type: "code",
          lang: "bash",
          content: `\
npm install @enesbaspinar/money
yarn add @enesbaspinar/money
pnpm install @enesbaspinar/money\
          `,
        },
      ],
    },
    {
      title: "Quick Start",
      items: [
        {
          type: "markdown",
          content:
            "Import the library and start using it to handle monetary values.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
import { money } from "@enesbaspinar/money";
    
const manipulatedMoney = money(12345.67)
  .add(200)
  .discount(0.5)
  .round(2);
console.log(manipulatedMoney.amount);`,
        },
        {
          type: "code",
          lang: "result",
          content: `\
6272.84`,
        },
        {
          type: "markdown",
          content: "Also format monetary values by locale.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
import { monetizer, RoundStrategy } from "@enesbaspinar/money";
    
const money = monetizer({ locale: "tr-TR" });
console.log(money(12345.67).format());
    
const advancedMoney = monetizer({
  locale: "tr-TR",
  precision: {
    digit: 2,
    strategy: RoundStrategy.DOWN,
  },
  preventGrouping: false,
  trimDoubleZeros: true,
  trimPaddingZeros: true,
  overridedSymbols: {
    TR: "TL",
  },
  templates: {
    "*": "{currency}{integer|,}{fraction|.}",
    TR: "{integer|,}{fraction|.} {currency}",
  },
});
console.log(advancedMoney(12345.67).format());
console.log(advancedMoney(12345.67).format({
  locale: "de-DE"
}));`,
        },
        {
          type: "code",
          lang: "result",
          content: `\
₺12.345,67
12,345.67 TL
€12,345.67`,
        },
      ],
    },
    {
      title: "API",
      items: [
        {
          type: "h3",
          content: "`money`",
        },
        {
          type: "markdown",
          content: `
Creates a new \`Money\` instance with a specified amount. It is a simple utility for instantiating money objects without any additional configuration.
`,
        },
        {
          type: "h3",
          content: "`createMoney` / `monetizer`",
        },
        {
          type: "markdown",
          content:
            "The `createMoney` function is a factory function that generates `Money` instances with a specific configuration. It uses the `monetizer` function internally and accepts a `MoneyFormatterConfig` object. This allows for the creation of money objects with predefined formatting rules.",
        },
      ],
    },
    {
      title: "Formatter Configuration",
      items: [
        {
          type: "markdown",
          content:
            "`locale` - A string representing the locale for formatting.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
{ locale:  "en-GB" }
{ locale:  "GB" }\
`,
        },
        {
          type: "markdown",
          content:
            "`templates` - An optional record of templates for formatting money strings.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
{
  templates: {
    "en-US": "{currency}{integer|,}{fraction|.|2}",
    "de-DE": "{integer|.}{fraction|,|3}{currency}",
    "*": "{integer|,}{fraction|.|3} {currency}",
  }
},\
`,
        },
        {
          type: "markdown",
          content:
            "`overridedSymbols` - An optional record that allows overriding default currency symbols.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
{
  overridedSymbols: {
    TR: "TL",
    "*": "$"
  },
}
`,
        },
        {
          type: "markdown",
          content:
            "`trimDoubleZeros` - Determines whether trailing double zeros (e.g., `10.00` becomes `10`) should be trimmed.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
{ trimDoubleZeros: true }
{
  trimDoubleZeros: {
    "TR": false,
    "de-DE": false,
    "*": true
  }
}
`,
        },
        {
          type: "markdown",
          content:
            "`trimPaddingZeros` - Determines whether padding zeros in decimals (e.g., `10.50` becomes `10.5`) should be trimmed.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
{ trimPaddingZeros: true }
{
  trimPaddingZeros: {
    "TR": false,
    "de-DE": false,
    "*": true
  }
}
`,
        },
        {
          type: "markdown",
          content:
            "`preventGrouping` - Prevents grouping (e.g., `1,000` becomes `1000`) if set to `true`.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
{ preventGrouping: true }\
`,
        },
        {
          type: "markdown",
          content:
            "`precision` - Configures the number of decimal digits and the rounding strategy.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
{ precision: { digit: 2, strategy: 'round' } }
{ precision: { digit: 3, strategy: 'ceil' } }\
`,
        },
      ],
    },
    {
      title: "Examples",
      items: [
        {
          type: "markdown",
          content:
            "Basic example of creating a money object and accessing its amount property.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
import { money } from "@enesbaspinar/money";

const price = money(12345.67);
console.log(price.amount);\
`,
        },
        {
          type: "code",
          lang: "result",
          content: `\
12345.67\
          `,
        },
        {
          type: "markdown",
          content:
            "Chaining operations like add, divide, multiply, and rounding the result using a specific strategy.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
import { money, RoundStrategy } from "@enesbaspinar/money";

const price = money(500.1456)
  .add(300)
  .divide(5)
  .multiply(2)
  .round(2, RoundStrategy.UP);

console.log(price.amount);\
          `,
        },
        {
          type: "code",
          lang: "result",
          content: `\
320.06\
          `,
        },
        {
          type: "markdown",
          content:
            "Formatting a money object to different locales like DE, de-DE, and tr-TR.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
import { money } from "@enesbaspinar/money";

const formattedPrice = money(5000000.1456).format({
  locale: "DE",
});

const formattedPrice2 = money(5000000.1456).format({
  locale: "de-DE",
});

const formattedPrice3 = money(5000000.1456).format({
  locale: "tr-TR",
});

console.log(formattedPrice);
console.log(formattedPrice2);
console.log(formattedPrice3);\
          `,
        },
        {
          type: "code",
          lang: "result",
          content: `\
5.000.000,1456€
5.000.000,1456€
₺5.000.000,1456\
          `,
        },
        {
          type: "markdown",
          content:
            "Formatting a money object to parts, showing detailed breakdowns like currency, integer, fraction, and formatted strings.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
import { money } from "@enesbaspinar/money";

const formattedPriceParts = money(5000000.1456).formatToParts({
  locale: "DE",
});

const formattedPriceParts2 = money(5000000.1456).formatToParts({
  locale: "de-DE",
});

const formattedPriceParts3 = money(5000000.1456).formatToParts({
  locale: "tr-TR",
});

console.log(formattedPriceParts);
console.log(formattedPriceParts2);
console.log(formattedPriceParts3);\
          `,
        },
        {
          type: "code",
          lang: "result",
          content: `\
{
  currency: '€',
  value: 5000000.1456,
  integer: '5.000.000',
  fraction: ',1456',
  formatted: '5.000.000,1456',
  display: '5.000.000,1456€'
}

{
  currency: '₺',
  value: 5000000.1456,
  integer: '5.000.000',
  fraction: ',1456',
  formatted: '5.000.000,1456',
  display: '₺5.000.000,1456'
}

{
  currency: '£',
  value: 5000000.1456,
  integer: '5,000,000',
  fraction: '.1456',
  formatted: '5,000,000.1456',
  display: '£5,000,000.1456'
}\
          `,
        },
        {
          type: "markdown",
          content:
            "Defining custom templates for formatting money objects and showing usage with different locales and trim options.",
        },
        {
          type: "code",
          lang: "typescript",
          content: `\
import { createMoney } from "@entities";

const money = createMoney({
  locale: "en-US",
  templates: {
    "en-US": "{currency}{integer|,}{fraction|.|2}",
    "de-DE": "{integer|.}{fraction|,|3}{currency}",
    "*": "{integer|,}{fraction|.|3} {currency}",
  },
  precision: { digit: 2, strategy: "nearest" },
});

const amounts = [5, 1234.567, 12345678.5, 89.0000001, 0];

console.log("Locale: en-US");
amounts.forEach((amount) => {
  console.log(money(amount).format({ trimDoubleZeros: true }));
});

console.log("\\nLocale: TR");
amounts.forEach((amount) => {
  console.log(money(amount).format({ locale: "TR", trimPaddingZeros: true }));
});\
          `,
        },
        {
          type: "code",
          lang: "result",
          content: `\
Locale: en-US
$5
$1,234.57
$12,345,678.50
$89
$0

Locale: TR
5.00 ₺
1,234.57 ₺
12,345,678.5 ₺
89.00 ₺
0.00 ₺\
          `,
        },
      ],
    },
  ],
};

// add github button

export default async function PackagePage() {
  const renderItem = (item: any) => {
    switch (item.type) {
      case "code":
        return <CodeBlock lang={item.lang}>{item.content}</CodeBlock>;
      case "markdown":
        return <MarkdownContent>{item.content}</MarkdownContent>;
      case "title":
        return (
          <h2 className="my-4">
            <MarkdownContent>{item.content}</MarkdownContent>
          </h2>
        );
      case "h3":
        return (
          <h3 className="my-3">
            <MarkdownContent>{item.content}</MarkdownContent>
          </h3>
        );
      default:
        return;
    }
  };

  return (
    <main>
      <div className="bg-slate-100 py-8 px-4 md:py-10 md:px-12 border-b border-b-slate-200">
        <div className="flex flex-col items-center text-center mx-auto w-full max-w-[600px]">
          <img
            className="w-20 h-20 text-6xl mb-6"
            src={packageData.image}
            alt=""
          />
          <h1 className="mb-4">{packageData.name}</h1>
          <p>{packageData.description}</p>
          <div className="flex items-center gap-5">
            {/* <p className="m-0">v{packageMetadata["dist-tags"].latest}</p> */}
            <a href={`https://www.npmjs.com/@enesbaspinar/money`}>
              <img
                src="/logo/npm.svg"
                alt=""
                className="h-5 hover:animate-scream"
              />
            </a>
            <a href={`https://github.com/baspinarenes/money`}>
              <img
                src="/logo/github.png"
                alt=""
                className="h-7 hover:animate-scream"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="p-6 pb-0 md:p-12 flex flex-col gap-12 justify-center">
        <div className="flex flex-col gap-10 w-full mx-auto max-w-[600px]">
          {/* <div>
            <h2 className="mt-0 mb-4">Playgrounds</h2>
          </div> */}
          {packageData.content.map((section) => (
            <div key={section.title}>
              <h2 className="mt-0 mb-4">{section.title}</h2>
              {section.items.map((i, index) => (
                <React.Fragment key={section.title + i.type + index}>
                  {renderItem(i)}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
