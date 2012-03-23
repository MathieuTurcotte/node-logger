all: test

test:
	node_modules/nodeunit/bin/nodeunit tests/

.PHONY: test
