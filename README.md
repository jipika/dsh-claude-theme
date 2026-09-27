# dsh-claude-theme

> Claude's warm-ivory appearance for DeepSeek Harness — color tokens plus serif typography,
> and nothing else. Appearance only, so it coexists with `dsh-smooth-stream`.
>
> 给 DSH 换上 Claude 的暖米色配色 + 衬线字体，**只做外观、不含任何行为层**，
> 因此可以和 `dsh-smooth-stream`（流式渲染）同时开启。

[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

> **拥有**：`--dsw-alias-*` 全套配色 token（light + dark 两份）与衬线字体层（`--dsw-font-*`）。
> **冲突时**：与 `dsh-ui-harmonizer` 同写 alias token —— 本插件是完整皮肤，以本插件为准；harmonizer 只应保留「官方缺陷归一」那部分。
> **回滚**：删 profile `cordis.patch.yml` 里 id `claude-theme` 的 insert + 重启应用。

---

## 装了什么

- `COLOR_CSS` 覆盖一整套 `--dsw-alias-*` token，含 light 与 `[data-ds-dark-theme]` 两套。
- `FONT_CSS` 用 `SERIF`（Anthropic Serif → Tiempos → Georgia → 宋体）作用于标题 / 路径面包屑 / 引用 / headline。
- `SURFACE_CSS`（自有修补）：把浮层表面改成**实色** —— 覆盖 `--dsw-menu-surface-fill` 与
  `--dsw-menu-backdrop-filter`，模型选择 / 右键菜单这类 `MenuSurface` 卡片不再半透明透字
  （官方默认 light 只有 `#f8f9fa94` = 58% 白 + `blur(40px) saturate(150%)` 毛玻璃）。
- `BADGE_CSS`（自有修补）：修「推荐」徽章橙底橙字不可见。
- 以上规则的 `body:not([data-dsh-colors=off])` / `body:not([data-dsh-font=off])` 前缀只是沿用上游写法，
  body 上不会出现这两个 off 属性，所以**装了就是全量生效，没有开关**（手动给 body 加上 `data-dsh-colors=off`
  可临时关掉配色层，用于排查）。
- 注入是幂等的：每次 `apply()` 先删掉所有 `style[data-dsh-claude-theme]` 再重新写入当前 CSS
  （**不是**「标签已存在就 return」—— 那样在热重载下会跑成「新 JS + 旧 CSS」）。

**未包含**：BASE_CSS（行为层：流式揭示 / 视口跟随 / 展开收起）、logo 层（星爆头像，靠 DOM 替换实现）、三个设置开关。

## 安装

两种装法任选其一（都会往 profile 的 `dependencies` 加一项，再配一行 insert）：

```bash
# ① npm（快，走 registry）
dsh plugin --profile <profile> add dsh-claude-theme

# ② GitHub（源码直装，跟随 main 分支）
dsh plugin --profile <profile> add github:jipika/dsh-claude-theme
```

```yaml
# ~/.dsh/profiles/<profile>/cordis.patch.yml
- insert:
    - id: claude-theme
      name: dsh-claude-theme
```

`desktop` profile 被 Electron 独占（CLI 子命令会被拒），需手改 `package.json`（dependencies 加
`github:jipika/dsh-claude-theme`）+ `pnpm install`，再 insert 同一行。

**改 `lib/client.js` 后让页面重新加载**：DSH 0.1.7 起 host 对 `client.js` 是磁盘热读，重新打开页面（一次新导航）
就会加载新代码；若界面没变化，再重启 host 进程（⌘Q 重开应用）。注意 ⌘R 不触发新导航，改了等于没改。

## 卸载

删掉 `cordis.patch.yml` 里那行 insert（或给该行加 `disabled: true`）→ 重启：配色与字体全部恢复官方样式。

## 来源与许可

`lib/client.js` 里的 `SERIF` / `COLOR_CSS` / `FONT_CSS` 是**逐字切片**
（`grep -n` 定位锚点 → 按行号取值 → 与源字符串逐字比对校验）自
[`kelemiao/dsh-animation-optimization`](https://github.com/kelemiao/dsh-animation-optimization)
（MIT）的 client half 第 53 / 199-377 / 533-556 行，**未做任何改写**；切片脚本是一次性工具，未随本仓库分发。

上游包是 MIT，本插件因此沿用 MIT 并在此声明出处。上游更新后行号会漂移，重新切片前请先核对锚点。

## 已知限制

- `FONT_CSS` 命中官方 CSS Module 的哈希类（如 `.wSkVaW_crumbCurrent`、`.pXSMma_headline`），
  前端重建后选择器可能失效 —— 届时改这部分选择器即可。
- 只做外观：想要「省电/性能」层面的行为差异（流式揭示节奏、视口跟随），请另配 `dsh-smooth-stream`。

## License

MIT © 2026 jipika（CSS 部分来自 MIT 许可的 `dsh-animation-optimization`，见上）
