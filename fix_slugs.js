const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://socussnvesnveavnpopt.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvY3Vzc252ZXNudmVhdm5wb3B0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mzc1NjE1NywiZXhwIjoyMDk5MzMyMTU3fQ.-IulEkYwCpoUBVLG9hhTJTqmDaEXKGzGccZRuX-m03Q';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

function normalizeSlug(slug) {
  return slug
    .replace(/\s+/g, '-')     // 空格替换为 -
    .replace(/-+/g, '-')       // 多个 - 合并为一个
    .replace(/^-|-$/g, '')     // 去除首尾 -
    .toLowerCase();            // 转为小写
}

async function main() {
  // 获取所有文章
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug');

  if (error) {
    console.error('获取文章失败:', error);
    process.exit(1);
  }

  console.log(`找到 ${posts.length} 篇文章`);

  for (const post of posts) {
    if (post.slug.includes(' ')) {
      const newSlug = normalizeSlug(post.slug);
      console.log(`更新: "${post.slug}" → "${newSlug}"`);

      const { error: updateError } = await supabase
        .from('posts')
        .update({ slug: newSlug, updated_at: new Date().toISOString() })
        .eq('id', post.id);

      if (updateError) {
        console.error(`  更新失败:`, updateError);
      } else {
        console.log(`  成功更新`);
      }
    } else {
      console.log(`跳过: "${post.slug}" (无需更新)`);
    }
  }

  console.log('\n全部完成！');
}

main().catch(err => {
  console.error('脚本出错:', err);
  process.exit(1);
});
