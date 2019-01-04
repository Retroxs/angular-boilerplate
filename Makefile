.PHONY: release
default: release

install:
	yarn --registry=http://registry.npm.taobao.org

release: install
	yarn build

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake install\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  安装依赖"
	@echo "   \033[35mmake test\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  编译项目"
	@echo "   \033[35mmake help\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  显示帮助"
