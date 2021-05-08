module.exports = (rules = {}) => {
	return {
		postcssPlugin: "postcss-undecided",
		AtRule(rule) {
			if (!(rule.name in rules)) {
				return;
			}

			if (rule.params === String(rules[rule.name])) {
				rule.nodes.forEach(node => {
					rule.parent.insertBefore(rule, node);
				});
			}

			rule.parent.removeChild(rule);
		}
	};
};

module.exports.postcss = true
