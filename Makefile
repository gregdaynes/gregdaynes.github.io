.PHONY: dev
dev: 
	bundle exec jekyll serve --watch --drafts --livereload

.PHONY: build
build: 
	bundle exec jekyll clean
	bundle exec jekyll build --config _config.yml,_config.production.yml

.PHONY: clean
clean: 
	bundle exec jekyll clean
