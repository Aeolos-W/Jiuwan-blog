-- 插入作者
INSERT INTO authors (id, name, email, bio) VALUES
('a1b2c3d4-e5f6-4890-abcd-ef1234567890', 'Terence Tao', 'tao@math.ucla.edu', 'Mathematician at UCLA, Fields Medalist.');

-- 插入分类
INSERT INTO categories (id, name, slug, description, sort_order) VALUES
('c1b2c3d4-e5f6-4890-abcd-ef1234567891', 'Uncategorized', 'uncategorized', NULL, 0),
('c1b2c3d4-e5f6-4890-abcd-ef1234567892', 'Career advice', 'career-advice', 'Advice for mathematical careers', 1),
('c1b2c3d4-e5f6-4890-abcd-ef1234567893', 'On writing', 'on-writing', 'Advice on mathematical writing', 2),
('c1b2c3d4-e5f6-4890-abcd-ef1234567894', 'Books', 'books', 'Information about books', 3),
('c1b2c3d4-e5f6-4890-abcd-ef1234567895', 'Applets', 'applets', 'Mathematical applets and tools', 4);

-- 插入文章
INSERT INTO posts (id, title, slug, content, excerpt, published_at, author_id, category_id, tags, status, comment_count) VALUES
('f1b2c3d4-e5f6-4890-abcd-ef1234567890',
'A digestion of unit distance constructions',
'a-digestion-of-unit-distance-constructions',
E'Suppose that one has a set \(P\) of \(n\) points in the plane, which we will think of as the complex plane \(\mathbf{C}\). Let \(d_1(P)\) denote the number of unit distances determined by these points, i.e., pairs of points \(p, q \in P\) whose displacement \(w = q-p\) obeys the equation

$$w\overline{w} = 1. \quad (1)$$

(It makes little difference for the asymptotics, but we will count the pair \((q,p)\) separately from \((p,q)\) here.)

The **Erdos unit distance problem** asks, for a given large number \(n\), what is the largest possible value of \(d_1(P)\) amongst all sets \(P\) of cardinality \(n\)?

For instance, if one takes \(P\) to be \(n\) equally spaced collinear points with unit spacing, one can obtain a linear construction with \(d_1(P) = 2n-2\). Erdos observed that one can improve this construction asymptotically.',
'A discussion of the Erdos unit distance problem and recent constructions.',
'2026-07-03 10:00:00+00',
'a1b2c3d4-e5f6-4890-abcd-ef1234567890',
'c1b2c3d4-e5f6-4890-abcd-ef1234567891',
ARRAY['AI', 'Erdos distance problem', 'number field'],
'published',
11
);

INSERT INTO posts (id, title, slug, content, excerpt, published_at, author_id, category_id, tags, status, comment_count) VALUES
('f1b2c3d4-e5f6-4890-abcd-ef1234567891',
'Third SAIR competition: Inverse Galois challenge',
'third-sair-competition-inverse-galois-challenge',
E'The third annual Summer Apprenticeship in Research (SAIR) competition has been announced. This year''s challenge focuses on the **Inverse Galois Problem**.

The Inverse Galois Problem asks whether every finite group appears as the Galois group of some Galois extension of the rational numbers \(\mathbf{Q}\). This is one of the major open problems in algebraic number theory.

Participants will work on explicit constructions of polynomials with prescribed Galois groups, using tools from computational algebra and number theory.',
'The third SAIR competition focuses on the Inverse Galois Problem.',
'2026-06-16 14:30:00+00',
'a1b2c3d4-e5f6-4890-abcd-ef1234567890',
'c1b2c3d4-e5f6-4890-abcd-ef1234567891',
ARRAY['Galois theory', 'inverse Galois problem', 'number theory'],
'published',
5
);

INSERT INTO posts (id, title, slug, content, excerpt, published_at, author_id, category_id, tags, status, comment_count) VALUES
('f1b2c3d4-e5f6-4890-abcd-ef1234567892',
'Career advice: The importance of flexibility',
'career-advice-flexibility',
E'In my experience, one of the most important qualities for a successful mathematical career is **flexibility**. The ability to pivot between fields, to learn new tools, and to adapt to changing circumstances is invaluable.

When I was a graduate student, I was primarily focused on harmonic analysis. Over the years, I have worked in partial differential equations, number theory, combinatorics, and many other areas. Each transition required learning new techniques and perspectives, but the investment always paid off.

Here are some specific ways to cultivate flexibility:

1. **Attend seminars outside your area.** Even if you understand only a fraction of what is said, exposure to different ideas broadens your mathematical horizon.
2. **Read widely.** Don''t limit yourself to papers directly related to your thesis problem.
3. **Talk to people.** Mathematics is a social activity, and conversations with colleagues from different backgrounds can spark unexpected insights.
4. **Be patient with yourself.** Learning a new area takes time, and it is normal to feel lost at first.',
'Advice on the importance of flexibility in a mathematical career.',
'2026-05-20 09:00:00+00',
'a1b2c3d4-e5f6-4890-abcd-ef1234567890',
'c1b2c3d4-e5f6-4890-abcd-ef1234567892',
ARRAY['career advice', 'research'],
'published',
8
);

INSERT INTO posts (id, title, slug, content, excerpt, published_at, author_id, category_id, tags, status, comment_count) VALUES
('f1b2c3d4-e5f6-4890-abcd-ef1234567893',
'On writing: Structure and organization',
'on-writing-structure',
E'A well-structured mathematical paper is like a well-designed building: each component supports the others, and the overall effect is greater than the sum of its parts.

Here are some principles I try to follow:

**1. State your main results early.**
Readers should know what you have proved within the first few pages. Don''t make them wade through dozens of pages of preliminaries before revealing your main theorem.

**2. Motivate your definitions.**
Every definition should be motivated by an example, a counterexample, or a conceptual explanation. Never define something without explaining why it is needed.

**3. Use examples generously.**
Examples are the concrete anchors that keep abstract ideas grounded. Provide them before, during, and after your general theory.

**4. Signpost your arguments.**
Tell the reader where you are going before you get there. "We will now prove Theorem 1.2, which states that..." is much better than diving into a calculation without context.',
'Principles for structuring and organizing mathematical papers.',
'2026-04-10 11:00:00+00',
'a1b2c3d4-e5f6-4890-abcd-ef1234567890',
'c1b2c3d4-e5f6-4890-abcd-ef1234567893',
ARRAY['writing', 'mathematics'],
'published',
3
);

-- 插入评论
INSERT INTO comments (post_id, author_name, author_email, content, created_at, is_approved) VALUES
('f1b2c3d4-e5f6-4890-abcd-ef1234567890', 'Alice Math', 'alice@example.com', 'Great post! The connection to the complex plane is very elegant.', '2026-07-03 12:00:00+00', true),
('f1b2c3d4-e5f6-4890-abcd-ef1234567890', 'Bob Number', 'bob@example.com', 'I wonder if similar bounds hold for other norms.', '2026-07-03 14:30:00+00', true),
('f1b2c3d4-e5f6-4890-abcd-ef1234567892', 'Carol Grad', 'carol@example.com', 'This is exactly what I needed to hear as I finish my PhD.', '2026-05-21 08:00:00+00', true);

-- 插入标签
INSERT INTO tags (name, slug) VALUES
('AI', 'ai'),
('Erdos distance problem', 'erdos-distance-problem'),
('number field', 'number-field'),
('Galois theory', 'galois-theory'),
('inverse Galois problem', 'inverse-galois-problem'),
('number theory', 'number-theory'),
('career advice', 'career-advice'),
('research', 'research'),
('writing', 'writing'),
('mathematics', 'mathematics');

-- 关联文章标签
INSERT INTO post_tags (post_id, tag_id) VALUES
('f1b2c3d4-e5f6-4890-abcd-ef1234567890', (SELECT id FROM tags WHERE slug = 'ai')),
('f1b2c3d4-e5f6-4890-abcd-ef1234567890', (SELECT id FROM tags WHERE slug = 'erdos-distance-problem')),
('f1b2c3d4-e5f6-4890-abcd-ef1234567890', (SELECT id FROM tags WHERE slug = 'number-field')),
('f1b2c3d4-e5f6-4890-abcd-ef1234567891', (SELECT id FROM tags WHERE slug = 'galois-theory')),
('f1b2c3d4-e5f6-4890-abcd-ef1234567891', (SELECT id FROM tags WHERE slug = 'inverse-galois-problem')),
('f1b2c3d4-e5f6-4890-abcd-ef1234567892', (SELECT id FROM tags WHERE slug = 'career-advice')),
('f1b2c3d4-e5f6-4890-abcd-ef1234567892', (SELECT id FROM tags WHERE slug = 'research')),
('f1b2c3d4-e5f6-4890-abcd-ef1234567893', (SELECT id FROM tags WHERE slug = 'writing')),
('f1b2c3d4-e5f6-4890-abcd-ef1234567893', (SELECT id FROM tags WHERE slug = 'mathematics'));
