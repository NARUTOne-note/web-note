# git

- [gitmoji](https://gitmoji.carloscuesta.me/) :art:
- [emoji 图标](https://github.com/scotch-io/All-Github-Emoji-Icons)
- [git操作](http://www.bootcss.com/p/git-guide/)
- [git 常用命令](https://juejin.im/post/5dbe7a476fb9a0207f1035d0?utm_source=gold_browser_extension)

## 修改

```sh
git remote rm origin  # 移除origin
git remote add origin url  # 添加 origin

git reset –-hard [版本]  # 回退

# 修改用户名、邮箱
git config --global --list
git config --global user.name "your name"
git config --global user.email "your email"
# 本地
git config --local --list
git config  user.name "your name"
git config  user.email "your email"
```

## 查看

```bash
git config user.name
git config user.email
```

## 创建项目上传项目

```bash
git config --global user.name "wuzhong"

git config --global user.email "zhong.wu@baifendian.com"

git clone [-b branch] url 

cd  目标路径

git init

git remote add origin url

touch README.md

git add .

git commit  

git push -u origin master
```

## 创建分支

```bash
git clone url

cd 目标路径

git checkout -b develop

git add *

git commit -m "xx"

git push origin develop

# 拉取远程分支并创建本地分支
git checkout -b 本地分支名x origin/远程分支名x

# 更改本地关联的远程分支
git branch --set-upstream-to origin/devtest devtest
```

## 删除分支

```bash
git  branch -a  # 查看
git checkout master

#(本地)
#(需要切换到其他分支master)
git branch -d  name

#(远程)
git branch -r -d origin/name
git push origin :name
```

## 分支合并

```bash
git checkout master
git merge --no-ff develop

# 取消合并，返回合并前
git merge --abort
git pull origin master
git add *
git commit -m "xxx"
git push origin master

# 将master分支强行重置为dev分支
git reset --hard dev

# 将重置后的master分支强制推送到远程仓库
git push origin master -f
```

## 删除文件

```bash
git rm name -r
# 接着再commit + push一遍

git reset --hard 版本 # 回退版本
```

## 创建 稳定不可以改标签 tags

```bash
# 创建
git tag -a V1.2 -m 'WebSite version 1.2'

# 查看
git tag

# 推送tag
git push origin --tags

# 删除
git tag -d V1.2

git push origin :refs/tags/V1.2

# 获取版本代码
git fetch origin tag V1.2
```

## merge 还是 rebase

- merge: 合并分支
- rebase: 分支变基，就是这个分支checkout出来的commit，原本feat/B是从master中checkout出来的，但是使用`git rebase master`之后，就会以master最新的节点作为feat/B分支的基础。就像feat/B上所有的commit都是基于最新的master提交的。

> merge 保留git完整历史；rebase变改历史，但是减少一些日志节点，依赖更加清晰；只将主分支合并到自己的私有分支使用rebase，分享到其他分支使用merge；不要对在你的仓库外有副本的分支执行变基

## 技巧

- `git config --global alias.ac '!git add -A && git commit -m '` 可以将 git add 和 git commit -m 这两条命令合二为一

接下来你可以这样使用 git ac "提交信息"

- `git remote set-url origin [url]` 更改远程源
