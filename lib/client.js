// dsh-claude-theme — browser half（本地插件）
//
// 目的：把 dsh-animation-optimization 里那套「Claude 暖米色」外观（配色 token +
// 衬线字体）单独拿出来，做成**只注入 CSS** 的主题插件 —— 不碰流式揭示、视口
// 跟随、展开收起等任何行为，因此可以和 dsh-smooth-stream 共存。
//
// 来源与保真度：下面的 SERIF / COLOR_CSS / FONT_CSS 三段是**逐字切片**自
// ~/.dsh/profiles/desktop/node_modules/dsh-animation-optimization/lib/client.js
// （该包 v31 client half），行号 53 / 199-377 / 533-556，一字未改。
// 其中 COLOR_CSS 同时含 light 与 [data-ds-dark-theme] 两套 token，暗色模式自动跟上。
//
// 没有保留的东西：BASE_CSS（行为层）、logo 层（星爆头像，靠 DOM 替换实现）、
// 以及三个设置开关（原插件的开关用 body 属性 data-dsh-colors/logo/font 控制；
// 这里不带开关，装了即全量生效，想关就卸载）。
//
// 卸载/回滚：删掉 profile cordis.patch.yml 里 id 为 claude-theme 的 insert 行，
// 重启应用即可（刷新页面无效 —— host 在启动时就把 client bundle 读进内存了）。
window.__ModuleLoader__.load({
	id: "dsh-claude-theme",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		/** 两个 <style> 都带这个属性，用于幂等清理。 */
		var STYLE_SELECTOR = "style[data-dsh-claude-theme]";

		/* ↓↓↓ 以下三段来自 dsh-animation-optimization v31 client half，逐字未改 ↓↓↓ */

var SERIF = "'Anthropic Serif', 'Tiempos Text', Georgia, 'Times New Roman', 'Songti SC', 'STSong', 'SimSun', serif";

var COLOR_CSS = [
  /* ======================= Light tokens ======================= */
  "body:not([data-dsh-colors=off]) {",
  "  --dsw-alias-bg-base: #FAF9F5;",
  "  --dsw-alias-bg-layer-1: #FAF9F5;",
  "  --dsw-alias-bg-layer-2: #F5F3ED;",
  "  --dsw-alias-bg-layer-3: #F0EEE6;",
  "  --dsw-alias-bg-overlay: #E8E6DC;",
  "  --dsw-alias-bg-module-platform: #F5F3ED;",
  "  --dsw-alias-bg-multi-select: #F5F3ED;",
  "  --dsw-alias-bg-skeleton: rgba(20,20,19,0.06);",
  "  --dsw-alias-border-l1: rgba(20,20,19,0.06);",
  "  --dsw-alias-border-l2: rgba(20,20,19,0.10);",
  "  --dsw-alias-border-l2-darkmode-thin: rgba(20,20,19,0.10);",
  "  --dsw-alias-border-l3: rgba(20,20,19,0.14);",
  "  --dsw-alias-border-l4: rgba(20,20,19,0.20);",
  "  --dsw-alias-border-inverted: rgba(20,20,19,0.06);",
  "  --dsw-alias-border-inverted2: rgba(20,20,19,0.06);",
  "  --dsw-alias-label-primary: #141413;",
  "  --dsw-alias-label-primary-bluish: #141413;",
  "  --dsw-alias-label-primary-dimmed: #3D3D3A;",
  "  --dsw-alias-label-primary-foreground: #FAF9F5;",
  "  --dsw-alias-label-primary-inverted: #FAF9F5;",
  "  --dsw-alias-label-secondary: #3D3D3A;",
  "  --dsw-alias-label-tertiary: #87867F;",
  "  --dsw-alias-label-caption: #87867F;",
  "  --dsw-alias-label-dimmed: #B0AEA5;",
  "  --dsw-alias-brand-primary: #D97757;",
  "  --dsw-alias-brand-primary-invert: #FAF9F5;",
  "  --dsw-alias-brand-primary-new-colorprimary-new-color: #D97757;",
  "  --dsw-alias-brand-text: #141413;",
  "  --dsw-alias-button-primary-fill: #D97757;",
  "  --dsw-alias-button-primary-hover: #C96845;",
  "  --dsw-alias-button-primary-dimmed: #F0EEE6;",
  "  --dsw-alias-button-contrast-fill: #3D3D3A;",
  "  --dsw-alias-button-elevated-fill: #FAF9F5;",
  "  --dsw-alias-button-floating-fill: #FAF9F5;",
  "  --dsw-alias-button-floating-hover: #F5F3ED;",
  "  --dsw-alias-button-info-fill: #D97757;",
  "  --dsw-alias-button-info-hover: #C96845;",
  "  --dsw-alias-button-ghost-active-fill: #F0EEE6;",
  "  --dsw-alias-button-ghost-active-hover: #E8E6DC;",
  "  --dsw-alias-button-ghost-active-border: #87867F;",
  "  --dsw-alias-button-tool-bar-fill: rgba(61,61,58,0.5);",
  "  --dsw-alias-button-tool-bar-hover: rgba(61,61,58,0.6);",
  "  --dsw-alias-button-tool-bar-fill-invisible: rgba(20,20,19,0.36);",
  "  --dsw-alias-interactive-bg-hover: rgba(20,20,19,0.05);",
  "  --dsw-alias-interactive-bg-hover-accent: rgba(217,119,87,0.12);",
  "  --dsw-alias-interactive-bg-hover-danger: rgba(179,35,30,0.06);",
  "  --dsw-alias-interactive-bg-hover-solid: #F0EEE6;",
  "  --dsw-alias-interactive-bg-active: rgba(20,20,19,0.08);",
  "  --dsw-alias-state-business-primary: #D97757;",
  "  --dsw-alias-state-business-tertiary: #F0E1D8;",
  "  --dsw-alias-state-error-primary: #B3231E;",
  "  --dsw-alias-state-error-secondary: #D1524A;",
  "  --dsw-alias-state-success-primary: #3E7A4E;",
  "  --dsw-alias-state-success-secondary: #5C8A6A;",
  "  --dsw-alias-state-success-tertiary: #E8EEE2;",
  "  --dsw-alias-state-warn-primary: #A8701E;",
  "  --dsw-alias-state-warn-secondary: #C0892E;",
  "  --dsw-alias-state-warn-tertiary: #F2E8D2;",
  "  --dsw-alias-state-warn-label: #8C5E1A;",
  "  --dsw-alias-markdown-code-block: #F5F3ED;",
  "  --dsw-alias-markdown-code-block-banner: #F0EEE6;",
  "  --dsw-alias-markdown-inline-code: #EEEBE2;",
  "  --dsw-alias-markdown-code-segment-selected: #FAF9F5;",
  "  --dsw-alias-markdown-code-segment-unselected: #F0EEE6;",
  "  --dsw-alias-markdown-citation: #F0EEE6;",
  "  --dsw-alias-markdown-placeholder: #F0EEE6;",
  "  --dsw-alias-markdown-tag: #F0EEE6;",
  "  --dsw-alias-scrollbar-bg-l1: #E8E6DC;",
  "  --dsw-alias-scrollbar-bg-l2: #E8E6DC;",
  "  --dsw-alias-scrollbar-hover-l1: #C6C4BA;",
  "  --dsw-alias-scrollbar-hover-l2: #C6C4BA;",
  "  --dsw-alias-toast-bg: #141413;",
  "  --dsw-alias-tooltip-bg: #3D3D3A;",
  "  --dsw-specific-sidebar-fill: #F5F3ED;",
  "  --dsw-specific-sidebar-nav-item-active: #F0EEE6;",
  "  --dsw-specific-sidebar-nav-item-hover: #F5F3ED;",
  "  --dsw-specific-sidebar-nav-item-active-accent: #D97757;",
  "  --dsw-specific-bubble: #F0EEE6;",
  "  --dsw-specific-bubble-highlight: #E8E6DC;",
  "  --dsw-specific-input-major: #FAF9F5;",
  "  --dsw-specific-login-input: #FAF9F5;",
  "  --dsw-specific-menu: #FAF9F5;",
  "  --dsw-specific-selector: #F5F3ED;",
  "  --dsw-specific-tip: #F0EEE6;",
  "}",

  /* ======================= Dark tokens ======================= */
  "body:not([data-dsh-colors=off])[data-ds-dark-theme] {",
  "  --dsw-alias-bg-base: #1F1E1C;",
  "  --dsw-alias-bg-layer-1: #262523;",
  "  --dsw-alias-bg-layer-2: #2B2A27;",
  "  --dsw-alias-bg-layer-3: #302E2B;",
  "  --dsw-alias-bg-overlay: #3A3835;",
  "  --dsw-alias-bg-module-platform: #262523;",
  "  --dsw-alias-bg-multi-select: #2B2A27;",
  "  --dsw-alias-bg-skeleton: rgba(240,238,230,0.08);",
  "  --dsw-alias-border-l1: rgba(240,238,230,0.08);",
  "  --dsw-alias-border-l2: rgba(240,238,230,0.12);",
  "  --dsw-alias-border-l2-darkmode-thin: rgba(240,238,230,0.08);",
  "  --dsw-alias-border-l3: rgba(240,238,230,0.16);",
  "  --dsw-alias-border-l4: rgba(240,238,230,0.22);",
  "  --dsw-alias-border-inverted: rgba(240,238,230,0.08);",
  "  --dsw-alias-border-inverted2: rgba(240,238,230,0.08);",
  "  --dsw-alias-label-primary: #F0EEE6;",
  "  --dsw-alias-label-primary-bluish: #F0EEE6;",
  "  --dsw-alias-label-primary-dimmed: #C6C4BA;",
  "  --dsw-alias-label-primary-foreground: #141413;",
  "  --dsw-alias-label-primary-inverted: #141413;",
  "  --dsw-alias-label-secondary: #C6C4BA;",
  "  --dsw-alias-label-tertiary: #87867F;",
  "  --dsw-alias-label-caption: #6E6C66;",
  "  --dsw-alias-label-dimmed: #4A4844;",
  "  --dsw-alias-brand-primary: #D97757;",
  "  --dsw-alias-brand-primary-invert: #141413;",
  "  --dsw-alias-brand-primary-new-colorprimary-new-color: #D97757;",
  "  --dsw-alias-brand-text: #F0EEE6;",
  "  --dsw-alias-button-primary-fill: #D97757;",
  "  --dsw-alias-button-primary-hover: #E28A6B;",
  "  --dsw-alias-button-primary-dimmed: #302E2B;",
  "  --dsw-alias-button-contrast-fill: #F0EEE6;",
  "  --dsw-alias-button-elevated-fill: #2B2A27;",
  "  --dsw-alias-button-floating-fill: #2B2A27;",
  "  --dsw-alias-button-floating-hover: #302E2B;",
  "  --dsw-alias-button-info-fill: #D97757;",
  "  --dsw-alias-button-info-hover: #E28A6B;",
  "  --dsw-alias-button-ghost-active-fill: #262523;",
  "  --dsw-alias-button-ghost-active-hover: #302E2B;",
  "  --dsw-alias-button-ghost-active-border: #87867F;",
  "  --dsw-alias-button-tool-bar-fill: rgba(198,196,186,0.5);",
  "  --dsw-alias-button-tool-bar-hover: rgba(198,196,186,0.6);",
  "  --dsw-alias-button-tool-bar-fill-invisible: rgba(240,238,230,0.36);",
  "  --dsw-alias-interactive-bg-hover: rgba(240,238,230,0.08);",
  "  --dsw-alias-interactive-bg-hover-accent: rgba(217,119,87,0.20);",
  "  --dsw-alias-interactive-bg-hover-danger: rgba(209,82,74,0.15);",
  "  --dsw-alias-interactive-bg-hover-solid: #2B2A27;",
  "  --dsw-alias-interactive-bg-active: rgba(240,238,230,0.14);",
  "  --dsw-alias-state-business-primary: #D97757;",
  "  --dsw-alias-state-business-tertiary: #4A3228;",
  "  --dsw-alias-state-error-primary: #D1524A;",
  "  --dsw-alias-state-error-secondary: #D1524A;",
  "  --dsw-alias-state-success-primary: #6FA67B;",
  "  --dsw-alias-state-success-secondary: #6FA67B;",
  "  --dsw-alias-state-success-tertiary: #2E3A2F;",
  "  --dsw-alias-state-warn-primary: #D9A64B;",
  "  --dsw-alias-state-warn-secondary: #D9A64B;",
  "  --dsw-alias-state-warn-tertiary: #433A28;",
  "  --dsw-alias-state-warn-label: #C0892E;",
  "  --dsw-alias-markdown-code-block: #262523;",
  "  --dsw-alias-markdown-code-block-banner: #201F1D;",
  "  --dsw-alias-markdown-inline-code: #2B2A27;",
  "  --dsw-alias-markdown-code-segment-selected: #302E2B;",
  "  --dsw-alias-markdown-code-segment-unselected: #201F1D;",
  "  --dsw-alias-markdown-citation: #2B2A27;",
  "  --dsw-alias-markdown-placeholder: #2B2A27;",
  "  --dsw-alias-markdown-tag: #2B2A27;",
  "  --dsw-alias-scrollbar-bg-l1: #4A4844;",
  "  --dsw-alias-scrollbar-bg-l2: #4A4844;",
  "  --dsw-alias-scrollbar-hover-l1: #6E6C66;",
  "  --dsw-alias-scrollbar-hover-l2: #6E6C66;",
  "  --dsw-alias-toast-bg: #302E2B;",
  "  --dsw-alias-tooltip-bg: #3A3835;",
  "  --dsw-specific-sidebar-fill: #201F1D;",
  "  --dsw-specific-sidebar-nav-item-active: #2B2A27;",
  "  --dsw-specific-sidebar-nav-item-hover: #262523;",
  "  --dsw-specific-sidebar-nav-item-active-accent: #D97757;",
  "  --dsw-specific-bubble: #2B2A27;",
  "  --dsw-specific-bubble-highlight: #302E2B;",
  "  --dsw-specific-input-major: #262523;",
  "  --dsw-specific-login-input: #201F1D;",
  "  --dsw-specific-menu: #2B2A27;",
  "  --dsw-specific-selector: #2B2A27;",
  "  --dsw-specific-tip: #2B2A27;",
  "}",

  "body:not([data-dsh-colors=off]) { background-color: #FAF9F5; }"
].join("\n");

var FONT_CSS = [
  "body:not([data-dsh-font=off]) h1,",
  "body:not([data-dsh-font=off]) h2,",
  "body:not([data-dsh-font=off]) h3,",
  "body:not([data-dsh-font=off]) h4,",
  "body:not([data-dsh-font=off]) h5,",
  "body:not([data-dsh-font=off]) h6 {",
  "  font-family: " + SERIF + ";",
  "  font-weight: 500;",
  "  letter-spacing: -0.02em;",
  "  line-height: 1.15;",
  "  color: var(--dsw-alias-label-primary);",
  "}",
  "body:not([data-dsh-font=off]) h1 { font-size: 1.5em; }",
  "body:not([data-dsh-font=off]) h2 { font-size: 1.35em; }",
  "body:not([data-dsh-font=off]) h3 { font-size: 1.2em; }",
  "body:not([data-dsh-font=off]) .wSkVaW_crumbCurrent { font-family: " + SERIF + " !important; font-size: 15px; font-weight: 500; letter-spacing: -0.01em; }",
  "body:not([data-dsh-font=off]) .pXSMma_headline,",
  "body:not([data-dsh-font=off]) .pXSMma_headlineText { font-family: " + SERIF + " !important; font-weight: 500; letter-spacing: -0.02em; }",
  "body:not([data-dsh-font=off]) blockquote {",
  "  font-family: " + SERIF + ";",
  "  font-style: italic;",
  "}"
].join("\n");

		/* ↑↑↑ 切片结束 ↑↑↑ */

		function inject() {
			if (typeof document === "undefined" || !document.head) return;
			// 幂等：先清掉上一次注入的（HMR / 重复 apply 都不会叠加）
			var stale = document.querySelectorAll(STYLE_SELECTOR);
			for (var i = 0; i < stale.length; i++) stale[i].remove();
			var makeStyle = function (attr, css) {
				var tag = document.createElement("style");
				tag.setAttribute("data-dsh-claude-theme", attr);
				tag.textContent = css;
				return tag;
			};
			document.head.appendChild(makeStyle("colors", COLOR_CSS));
			document.head.appendChild(makeStyle("fonts", FONT_CSS));
		}

		function apply() {
			inject();
		}

		exports.name = "dsh-claude-theme";
		exports.inject = [];
		exports.apply = apply;
		return module.exports;
	}
});
