const postcss = require("postcss")

const plugin = require("./")

async function run (input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it("strips", async () => {
	await run(
		":root {color: red;}" +
		"@keep yes {" +
		"p {color: white;}" +
		"}",
		":root {color: red;}",
		{
			keep: "no"
		}
	);
});

it("keeps", async () => {
	await run(
		":root {color: red;}" +
		"@keep yes {" +
		"p {color: white;}" +
		"}",
		":root {color: red;}" +
		"p {color: white;}",
		{
			keep: "yes"
		}
	);
});

it("understands bool", async () => {
	await run(
		":root {color: red;}" +
		"@keep true {" +
		"p {color: white;}" +
		"}",
		":root {color: red;}" +
		"p {color: white;}",
		{
			keep: true
		}
	);
});

it("handles undefined", async () => {
	await run(
		":root {color: red;}" +
		"@keep undefined {" +
		"p {color: white;}" +
		"}",
		":root {color: red;}" +
		"p {color: white;}",
		{
			keep: undefined
		}
	);
});

it("doesn’t touch unspecified at-rules", async () => {
	await run(
		":root {color: red;}" +
		"@unknown rule {" +
		"p {color: white;}" +
		"}",
		":root {color: red;}" +
		"@unknown rule {" +
		"p {color: white;}" +
		"}",
		{
			known: true
		}
	);
});

it("handles multiple rules correctly", async () => {
	await run(
		":root {color: red;}" +
		"@light on {" +
		"p {color: white;}" +
		"}" +
		"@water running {" +
		"span {display: inline-block;}" +
		"}",
		":root {color: red;}" +
		"span {display: inline-block;}",
		{
			light: "off",
			water: "running"
		}
	);
});
