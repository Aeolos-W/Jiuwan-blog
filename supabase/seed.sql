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
