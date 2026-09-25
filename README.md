# 袋米旅行手账 · 纽约首尔 11 天

七七一家的旅行手账 —— 76 站纽约 + 首尔行程，一屏一站、可翻动、可打卡、可看地图，**能装到手机主屏当 App 用，断网也能开**。

🔗 线上地址：<https://godenxu.github.io/daimi-NewYorkSeoul/>

---

## 一、这个仓库里有什么

| 文件 | 作用 | 能不能删 |
| --- | --- | --- |
| `index.html` | **整个 App 本体**（约 4.3 MB）。样式、脚本、76 张景点实景图、20 只袋米全在这一个文件里 | ❌ 不能 |
| `manifest.json` | 应用清单。告诉手机这个 App 叫什么、图标长啥样、以什么形态打开 | ❌ 不能 |
| `sw.js` | Service Worker。负责把 App 存进手机缓存，**断网也能打开** | ❌ 不能 |
| `icon-192.png` / `icon-512.png` | 普通图标，安卓主屏用 | ❌ 不能 |
| `icon-192-maskable.png` / `icon-512-maskable.png` | 自适应图标，安卓各品牌圆角/圆形裁切用，不会把袋米的脑袋裁掉 | ❌ 不能 |
| `icon-180.png` | iPhone / iPad 主屏图标 | ❌ 不能 |
| `.nojekyll` | 空文件。告诉 GitHub Pages「别做额外处理，原样发布」 | 建议保留 |

> 前 7 个文件是一套，缺任何一个，手机点「安装」都会失败。

---

## 二、为什么之前安装会提示"无法显示此应用"

之前仓库里**只有 `index.html` 一个文件**。

`index.html` 里写着要去找 `manifest.json`、`sw.js` 和几个图标 —— 但站点上根本没有这些文件，手机浏览器一请求全是 **404**。

安卓 Chrome 的判定逻辑是：拿不到清单、拿不到合规图标 → 这个网页**不符合安装条件** → 直接拒绝安装（就是那句"无法显示此应用"）。这不是页面坏了，页面照常能看，只是**装不成 App**。

现在这些文件都补齐了，问题已解决。

---

## 三、怎么把它传上去（二选一）

### 方式 A：网页上传（不用装任何工具）

1. 打开 <https://github.com/godenxu/daimi-NewYorkSeoul>
2. 点右上角 **Add file → Upload files**
3. 把 `C:\Users\Administrator\Documents\Workbuddy\daimi-NewYorkSeoul\` 里的 **全部文件**一起拖进页面，别漏：

   ```
   index.html
   manifest.json
   sw.js
   icon-180.png
   icon-192.png
   icon-512.png
   icon-192-maskable.png
   icon-512-maskable.png
   .nojekyll   ← 这个是隐藏文件，资源管理器里要先勾「查看 → 显示 → 隐藏的项目」才看得见
   ```

4. 下面 commit message 随便写，例如 `补齐PWA文件`，点 **Commit changes**
5. 等 1～2 分钟，GitHub Pages 自动重新发布

> 漏掉 `.nojekyll` 一般也不会出事，只是 GitHub 会多做一道多余的 Jekyll 处理。其余 8 个文件一个都不能少。

### 方式 B：命令行

```bash
cd C:/Users/Administrator/Documents/Workbuddy/daimi-NewYorkSeoul
git add -A
git commit -m "补齐 PWA 全套文件"
git push origin main
```

首次推送会要求登录 GitHub（用户名 + 个人访问令牌，不是密码）。

### 传完怎么确认成功

浏览器打开这两个地址，**都应该直接显示一段 JSON 文字**（而不是 404）：

- <https://godenxu.github.io/daimi-NewYorkSeoul/manifest.json>
- <https://godenxu.github.io/daimi-NewYorkSeoul/sw.js>

图标地址同理：<https://godenxu.github.io/daimi-NewYorkSeoul/icon-192.png> 应该显示袋米图标。

---

## 四、手机上怎么装

### iPhone 13

Safari 是**唯一**能装到主屏的浏览器（微信自带浏览器、Chrome 都不行）。

1. 用 **Safari** 打开 <https://godenxu.github.io/daimi-NewYorkSeoul/>
2. 等页面完全加载（第一次要下 4 MB，稍等一下）
3. 点屏幕底部的 **分享按钮**（方框+向上箭头）
4. 往下滑，选 **添加到主屏幕**
5. 右上角点 **添加**

主屏上就会出现袋米图标，点开是全屏的，没有浏览器地址栏。

> iPhone 上没有"安装应用"这个按钮，那是安卓的说法。iOS 的装法就是"添加到主屏幕"。

### 三星 Z Fold6 / 其他安卓

**用 Chrome：**

1. 打开 <https://godenxu.github.io/daimi-NewYorkSeoul/>
2. 地址栏右侧会出现一个 **带下箭头的方框图标**（或菜单里出现"安装应用"）
3. 点它 → **安装**
4. 折叠屏展开状态下也可以正常用，界面会自适应

**用三星自带浏览器：**

1. 打开同一地址
2. 底部菜单 **≡ → 添加页面到 → 主屏幕**

---

## 五、装完要注意的几件事

**第一次打开要联网。** 页面本身 4.3 MB（含 76 张实景图），需要先下一遍存进手机。之后再打开，断网也能用。

**地图瓦片要联网。** 地图底图是外部服务，断网时页面会自动降级成手绘路线图，行程信息不丢。

**打卡进度存在浏览器里。** iPhone 的 Safari 和主屏 App 是**两套独立存储** —— 在 Safari 里打的卡，主屏 App 里看不到，反之也一样。建议固定用主屏 App 打卡。换手机、清缓存会丢进度。

**更新了内容怎么让手机拿到新版**：改完 `index.html` 后，把 `sw.js` 里的 `var CACHE = 'daimi-trip-v1';` 改成 `v2`、`v3` …… 否则手机会一直用旧缓存。重新上传后，手机上**多开几次**（或卸载重装）即可刷新。

**发给家人**：直接把线上地址发微信即可，对方点开就能看、能装。不需要传文件。

---

## 六、本地备用文件

如果只想发一个文件给别人（微信直传、U 盘拷贝），用项目目录里的：

```
C:/Users/Administrator/Documents/Antigravity/纽约首尔旅行助手/袋米旅行手账.html
```

这是**单文件版**：图标内嵌成 data URI，双击就能打开，零外部请求。缺点是这个版本**装不成 PWA App**（因为清单和 Service Worker 必须是独立文件），只能当网页看。

两种形态各有用处：

| | 单文件版 | 本仓库（PWA 版） |
| --- | --- | --- |
| 双击 / 发微信 | ✅ 一个文件搞定 | ❌ 要传一整套 |
| 装到手机主屏当 App | ❌ | ✅ |
| 断网打开 | ✅ | ✅ |
| 首屏体积 | 4.4 MB | 4.3 MB |

---

*袋米 🍚 陪老爸把这一趟走完。*
