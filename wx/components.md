# 组件

## 视图容器

### view

视图容器

- hover-class    指定按下的样式类, 当hover-class="none" 时, 没有点击效果
- hover-stop-propagation 指定是否阻止本节点的祖先节点出现点击状态(冒泡)
- hover-start-time  按住多久后出现点击态, ms
- hover-stay-time 松开后点击态保留时长

### scroll-view 

可滚动视图区域

- scroll-x  允许横向滚动
- scroll-y  允许纵向滚动
- upper-threshold  距离顶部/左边多少距离触发 scrolltoupper 事件
- lower-threshold 距离底部/右边多少距离触发 scrolltolower 事件
- scroll-top 设置竖向滚动条位置
- scroll-left 设置横向滚动条位置
- scroll-into-view 值为某一子元素的 id(不能以数字开头), 设置哪个方向滚动. 则在哪个方向滚动到该元素
- scroll-with-animation  设置滚动条位置时使用动画过渡
- enable-back-to-top IOS点击顶部状态栏, 安卓双击标题栏时, 滚动条返回顶部, 只支持竖向
- bindscrollupper 滚动到顶部/左边, 会触发 scrolltoupper 事件
- bindscrolltolower 滚动到底部/右边, 会触发 scrolltolower 事件
- bindscroll 滚动时触发

### swiper 

滑块视图容器

- indicator-dots  是否显示面板指示点
- indicator-color  指示点颜色
- indicator-active-color 指示点选中颜色
- autoplay 是否自动切换
- current 当前所在滑块 index
- current-item-id 当前所在滑块的 item-id, 不能与 current 同时指定
- interval 自动切换时间间隔
- duration 滑动动画时长
- circular 是否采用衔接滑动(循环)
- vertical 滑动方向是否为纵向
- previous-margin 前边距. 可用于露出前一项的一小部分, 接收 px 和 rpx
- next-margin 后边距, 可用于露出后一项的一小部分
- display-multiple-items 同时显示的滑块数量
- skip-hidden-item-layout 是否跳过未显示的滑块布局, true 则可优化复杂情况下的滑动性能
- bindchange current 改变时触发函数
- bindtransition    swiper-item 位置发生变化时会触发 transition 事件
- bindanimationfinish    动画结束时, 触发animationfinish 事件

### movable-view

可移动的视图容器, 在页面中可以拖拽滑动

- direction  移动方向, all/vertical/horizontal/none
- inertia 是否带有惯性
- out-of-bounds 超出可视区后是否还可以移动
- x 定义x轴方向的偏移量, 如果x轴不在可移动范围内, 会自动移动到可移动方
- y 定义 y 轴方向的偏移量, 同上
- damping 阻尼系数, 用于控制 x/y 改变时的动画和过界动画回弹的动画, 值越大移动地越快
- friction 摩擦系数, 用于控制惯性滑动的动画, 值越大摩擦力越大, 滑块越快停止, >0
- disabled 是否禁用
- scale 是否支持双指缩放, 默认缩放瘦小生效区域是在移动视图容器内
- scale-min 定义缩放倍数最小值
- scale-max 定义缩放倍数最大值
- scale-value 定义缩放倍数 0.5-10
- animation 是否使用动画
- bindchange 拖动过程中触发的事件
- bindscale 缩放过程中触发的事件

两个特殊事件

- htouchmove 初次手指触摸后移动为横向的移动, 如果 catach 此事件, 以为这 touchmove 也被 catch
- vtouchmove 初次手指触摸后移动为纵向的移动

**注意** movable-view 必须在 <movable-area /> 组件中, 且必须是直接子节点

#### movable-area

movable-view 的可移动区域

- scale-area 当里面的 movable-view 设置为支持双指缩放时, 设置此值可将缩放手势生效区域修改为整个 movable-area

movable-area 必须设置 width 和 height属性

当movable-view 小于 movable-area 时, movable-view 的移动范围是在 movable-area 内

当movable-view 大于 movable-area时, movable-view 的移动范围必须包含 movable-area (x, y 方向分开考虑)

### cover-view

覆盖在原生组件上的文本视图

覆盖在原生组件之上的文本视图, 可覆盖的原生组件包括 map/ video/ canvas/ camera/ live-player /live-pusher 只支持嵌套 cover-view 和 cover-image, 可以在 cover-view 上使用 button

- scroll-top 设置顶部滚动偏移量, 在设置了 scroll-y: scroll成为滚动元素之后生效

### cover-image

覆盖在原生组件之上的图片视图, 可覆盖的原生组件同 cover-view, 支持嵌套在 cover-view 中

- src 图片路径, 暂不支持 base64
- bindload 图片加载成功时触发
- binderror 图片加载失败时触发

## 基础内容

### icon

图标

- type  icon的类型, 有效值: success/ success_no_circle/ info/ warn/ waiting / cancel /download/ search / clear
- size  icon的大小, 单位px
- color icon颜色, 同 css 的color

```html
<icon type="success" size="56rpx" color="#368" />
```

### text

文本

- selectable  文本是否可选, 默认 false
- space 显示连续空格, 默认 false
  - ensp 中文字符空格一半大小
  - emsp 中文字符空格大小 
  - nbsp 根据字体设置空格大小
- decode 是否解码, 默认 false

decode 可以解析的有 `&nbsp;` `&lt;` `&gt;` `&amp;` `&apos;`  `&emsp;` `&ensp;`

<text> 组件内只支持 \<text> 嵌套

除了文本能借你到哪以外的其他节点都无法长按选中

### rich-text

富文本

### progress

进度条

- percent 百分比 0 ~ 100
- show-info 进度条右侧显示百分比
- border-radius 进度条圆角大小
- font-size  文字大小
- stroke-width 进度条宽度
- color 已选择进度条颜色(推荐使用 activeColor)
- activeColor 已选择进度条颜色
- backgroundColor 未选择进度条颜色
- active 动画从左万往右的动画
- active-mode backwards 动画从头开始  forwards 动画从上次结束点继续
- bindactiveend 动画完毕事件