# dsh-claude-theme

> Claude's warm-ivory appearance for DeepSeek Harness — color tokens plus serif typography,
> and nothing else. Appearance only, so it coexists with `dsh-smooth-stream`.
>
> 给 DSH 换上 Claude 的暖米色配色 + 衬线字体，**只做外观、不含任何行为层**，
> 因此可以和 `dsh-smooth-stream`（流式渲染）同时开启。

[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 装了什么

- `COLOR_CSS` 覆盖一整套 `--dsw-alias-*` token，含 light 与 `[data-ds-dark-theme]` 两套。
- `FONT_CSS` 用 `SERIF`（Anthropic Serif → Tiempos → Georgia → 宋体）作用于标题 / 路径面包屑 / 引用 / headline。
- 两者的规则都自带 `body:not([data-dsh-colors=off])` / `body:not([data-dsh-font=off])` 前缀，
  而 body 上不会出现这两个 off 属性，所以**装了就是全量生效，没有开关**。
- 注入是幂等的：`<style data-dsh-claude-theme>` 已存在就跳过。

**未包含**：BASE_CSS（行为层：流式揭示 / 视口跟随 / 展开收起）、logo 层（星爆头像，靠 DOM 替换实现）、三个设置开关。

## 安装

```bash
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

**改 `lib/client.js` 后必须重启 host 进程**（刷新页面无效：client bundle 在启动时就读进内存了）。

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
