# git

- [gitmoji](https://gitmoji.carloscuesta.me/) :art:
- [emoji 图标](https://github.com/scotch-io/All-Github-Emoji-Icons)
- [git操作](http://www.bootcss.com/p/git-guide/)
- [git 常用命令](https://juejin.im/post/5dbe7a476fb9a0207f1035d0?utm_source=gold_browser_extension)
- [提效高级的git命令](https://juejin.cn/post/7071780876501123085?utm_source=gold_browser_extension)

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

# 查看配置
git config --list

# 重置配置
git config --global --unset user.name
```

## 查看

```bash
git config user.name
git config user.email

# 提交信息
git log
# 查看历史记录，它记录了所有的 commit 操作记录，便于错误操作后找回记录。
git reflog
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

# 删除远程分支
git push origin --delete <branch_name>
```

## 分支合并

```bash
git checkout master
git merge --no-ff develop
# 合并commit 记录
git merge --squash develop 

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

```

## tags

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

## stash

> 提交暂存，能够将还未 commit 的代码存起来，让你的工作目录变得干净。

代码暂存，切换到其他分支干活，后续切换会当前分支，恢复暂存代码继续干活，避免提交未完成的代码，影响远程分支

```bash
# 保存当前未commit的代码
git stash

# 保存当前未commit的代码并添加备注
git stash save "备注的内容"

# 列出stash的所有记录
git stash list

# 删除stash的所有记录
git stash clear

# 应用最近一次的stash
git stash apply

# 应用最近一次的stash，随后删除该记录
git stash pop

# 删除最近的一次stash
git stash drop
```

## reset

> 回退

```bash
git reset --hard commit_id # 回退指定版本
git reset --hard HEAD^ # 回退上个版本
git reset --hard HEAD~3 # 回退到前3次提交前
```

1、`reset --soft`  柔软回退，除了回溯节点外，还会保留节点的修改内容，相当于后悔药

场景：不小心把不该提交的内容 commit 了，这时想改回来，只能再 commit 一次，又多一条“黑历史”

```bash
# 柔软回退 恢复最近一次 commit
git reset --soft HEAD^

# 指定 commit 号时，会将该 commit 到最近一次 commit 的所有修改内容全部恢复，而不是只针对该 commit
git  reset --soft commit_id
```

以上说的是还未 push 的commit。对于已经 push 的 commit，也可以使用该命令，不过再次 push 时，由于远程分支和本地分支有差异，需要强制推送 `git push -f` 来覆盖被 reset 的 commit

## cherry-pick

> 将已经提交的 commit，复制出新的 commit 应用到分支里

场景：有时候开发分支中的代码记录被污染了，导致开发分支合到线上分支有问题，这时就需要拉一条干净的开发分支，再从旧的开发分支中，把 commit 复制到新分支。

```bash
# 多个提交
git cherry-pick commit1 commit2

# 放弃， 回到操作前的样子，就像什么都没发生过
gits cherry-pick --abort

# 退出 流程
gits cherry-pick --quit
```

## revert

> 将现有的提交还原，恢复提交的内容，并生成一条还原记录

场景：有时需要reset回退，但是不想影响最新提交记录中其他同事的提交

```bash
# revert 提交记录，不会影响这条记录后续的提交记录，同时生成一条记录记录这次revert， git log 还会显示之前的这条撤回提交记录，但是提交的内容其实已经撤回了
git revert commit_id

```

## merge 还是 rebase

- merge: 合并分支
- rebase: 分支变基，就是这个分支checkout出来的commit，原本feat/B是从master中checkout出来的，但是使用`git rebase master`之后，就会以master最新的节点作为feat/B分支的基础。就像feat/B上所有的commit都是基于最新的master提交的。

> merge 保留git完整历史；rebase变改历史，但是减少一些日志节点，依赖更加清晰；只将主分支合并到自己的私有分支使用rebase，分享到其他分支使用merge；不要对在你的仓库外有副本的分支执行变基

## 技巧

- `git config --global alias.ac '!git add -A && git commit -m '` 可以将 git add 和 git commit -m 这两条命令合二为一

接下来你可以这样使用 git ac "提交信息"

- `git remote set-url origin [url]` 更改远程源

- `git config --global url."https://gitclone.com/github.com/".insteadOf https://github.com/` 解决git clone 下载域外包慢，下载完 重置当前配置，避免push提交失败

- `git clone https://github.com/microsoft/TypeScript --depth=1 ts` 加上 --depth 会只下载一个 commit，所以内容少了很多，速度也就上去了, 只是不能切换到历史 commit 和历史分支。
