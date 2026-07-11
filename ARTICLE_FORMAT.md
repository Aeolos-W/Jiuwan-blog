# 文章格式指南（陶哲轩风格）

## 提供格式

把文章内容以**纯文本**发给我即可，不需要写 HTML。

---

## 一、基础格式

### 标题
```
## 二级标题
### 三级标题
```

### 加粗和斜体
```
**这是加粗文字**
*这是斜体文字*
```

### 列表
```
- 第一点
- 第二点
- 第三点

1. 第一步
2. 第二步
3. 第三步
```

### 链接
```
[点击这里](https://example.com)
```

### 图片
```
![图片描述](https://example.com/image.jpg)
```
> 图片需先上传到图床（如 [sm.ms](https://sm.ms)），再把链接发给我。

---

## 二、陶哲轩风格特色格式

### 1. 定理框（Theorem）

这是陶哲轩博客中最常见的灰色框，用于定理、引理、命题等。

**写法**：
```
> Theorem 1 (Chen construction): 设 P 为平面上的点集，则存在...
> 进一步地，对于任意正整数 n，可以找到...
```

**效果**：灰色背景框，顶部显示 **Theorem 1 (Chen construction)** 标题。

支持的所有类型：
- `Theorem` — 定理
- `Lemma` — 引理
- `Proposition` — 命题
- `Corollary` — 推论
- `Definition` — 定义
- `Remark` — 注记

---

### 2. 问题框（Question）

用于提出问题或开放性问题。

**写法**：
```
> Question: 是否存在一个点集 P，使得 d_1(P) 的增长速度超过 O(n^{1+c})？
```

**效果**：浅灰色背景框，顶部显示 **Question**。

---

### 3. 证明框（Proof）

用于定理的证明。

**写法**：
```
> Proof: 我们用归纳法证明。首先考虑 n=1 的情况...
> 假设结论对 n=k 成立，则对于 n=k+1...
> Q.E.D.
```

---

### 4. 普通引用块

用于引用他人的话或重要段落。

**写法**：
```
> 这是一段引用文字。可以写多行。
> 第二行继续引用内容。
```

---

### 5. 数学公式（带编号）

陶哲轩博客的公式通常带右侧编号。

**无编号公式**：
```
$$
w\overline{w} = 1
$$
```

**带编号公式**（在 $$ 后加 `(n)`）：
```
$$
w\overline{w} = 1
$$
(1)
```

**行内公式**：
```
这是欧拉公式 $e^{i\pi} + 1 = 0$ 的应用。
```

---

### 6. 脚注（Footnotes）

用于文中引用注释，点击可跳转。

**写法**：
```
这个结果最早由 Erdos 提出[^1]，后来得到了改进[^2]。

[^1]: Erdos, P. (1946). On sets of distances of n points.
[^2]: Guth, L. and Katz, N. (2015). On the Erdos distinct distances problem.
```

**效果**：文中显示上标 `[1]`、`[2]`，点击跳转到文末脚注区。

---

### 7. 代码

行内代码：
```
这是 `console.log()` 的用法。
```

代码块：
\`\`\`python
def hello():
    return "Hello"
\`\`\`

---

## 三、完整示例（模仿陶哲轩风格）

以下是一篇完整的陶哲轩风格文章示例：

```
Suppose that one has a set P of n points in the plane, which we will think of as the complex plane C. Let d_1(P) denote the number of unit distances determined by these points, i.e., pairs of points p, q in P whose displacement w = q-p obeys the equation

$$
w\overline{w} = 1
$$
(1)

(It makes little difference for the asymptotics, but we will count the pair (q,p) separately from (p,q) here.)

The **Erdos unit distance problem** asks, for a given large number n, what is the largest possible value of d_1(P) amongst all sets P of cardinality n?

For instance, if one takes P to be n equally spaced collinear points with unit spacing, one can obtain a linear construction with d_1(P) = 2n-2. Erdos observed that one can improve this construction asymptotically.

> Theorem 1 (Chen construction): There exist point sets P of n points in R^2 of arbitrarily large cardinality n with d_1(P) >= n^{1+c} for some absolute constant c > 0.

In fact, in the construction one can take c to be arbitrarily close to 1/2. Erdos actually asked whether d_1(P) could be bounded above by n^{1+o(1)}.

> Question: Does there exist a point set P with d_1(P) growing faster than O(n^{1+c}) for all c < 1/2?

The optimality of Theorem 1 is a heavily modified version of a result of Cilleruelo.

## References

- [Erdos unit distance problem](https://en.wikipedia.org/wiki/Erd%C5%91s_unit_distance_problem)
- [Guth-Katz bound](https://arxiv.org/abs/1011.4105)

[^1]: Erdos, P. (1946). On sets of distances of n points. Amer. Math. Monthly.
[^2]: Guth, L. and Katz, N. (2015). On the Erdos distinct distances problem in the plane. Ann. of Math.
```

---

## 四、发给我的格式

你只需要发给我以下内容：

1. **标题**：文章标题
2. **slug**：URL 标识（英文小写，不含空格，如 `unit-distance-constructions`）
3. **摘要**：一段简短描述（用于首页列表）
4. **分类**：选已有分类（Uncategorized / Career advice / On writing / Books / Applets）
5. **标签**：如 `{数论, 组合几何}`
6. **正文**：按上面的格式写的文章内容

我会帮你写入 Supabase 数据库。
