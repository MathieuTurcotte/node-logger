all: test

test:
	node_modules/nodeunit/bin/nodeunit tests/

publish:
	@npm publish

.PHONY: test publish
