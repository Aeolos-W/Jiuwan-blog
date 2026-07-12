-- 插入文章：解表剂总论
-- 请在 Supabase Dashboard 的 SQL Editor 中执行此脚本

-- 1. 确保分类存在
INSERT INTO categories (name, slug, description, sort_order)
VALUES ('方剂学', 'fangjixue', '中医方剂学相关文章', 99)
ON CONFLICT (slug) DO NOTHING;

-- 2. 确保标签存在
INSERT INTO tags (name, slug)
VALUES
  ('方剂学', 'fangjixue'),
  ('解表剂', 'jiebiaoji'),
  ('分类', 'fenlei')
ON CONFLICT (slug) DO NOTHING;

-- 3. 插入文章
INSERT INTO posts (
  id, title, slug, content, excerpt, author_id, category_id, tags, status, published_at, created_at, updated_at
) VALUES (
  uuid_generate_v4(),
  '解表剂总论',
  'jiebiao-introduction',
  E'解表剂的分类，宜注重"表"字，"表"指人体为外在六淫邪气所伤，教材上仅以辛温解表、辛凉解表、扶正解表三纲，余认为此种分类尚有可商榷之处。\n\n仅以辛温解表、辛凉解表、扶正解表去看解表剂，视角容易被局限，解表剂之所由设，居诸剂之首，当发挥其纲领作用，将风寒暑湿燥温均解表剂的范畴，不外乎辛凉、辛温、辛凉+辛温（解表），复补气、补血、滋阴、温阳（扶正）及化痰、化饮、化湿、行气、活血、祛瘀、通腑等治法的综合运用。\n\n以解表剂开启各论篇章，方可建立一个大的框架，以理解人体与邪气、大自然的相互关系和基本认知。\n\n辛温和辛凉从大的寒热方面去统括诸方是完全正确的，但是在某种程度上来说，针对的具体的六淫邪气的治法也发生了信息的失真，治法的多样性是医家为了更加贴合当下的病机及选定较为确定的处方所拟订的，既要在辛温和辛凉大的寒热方面去掌握，更要能够落到具体的六淫邪气的治法上去。\n\n而对于扶正解表来说应该纳入表里双解的范畴，并将单列的表里双解剂删去，与解表剂合并，在表里双解剂下面继续分扶正解表及逐邪解表，此种分类更贴近方剂的真实病机以便于指导临床运用。\n\n关于辛温解表及辛凉解表的认识，据金寿山先生的观点，"论治确有辛凉解表一法，论药则无辛凉解表之品。解表药多辛，叶天士说『辛胜即是汗药』，这是很有道理的，实为辛温加辛凉药而成，辛以解表，凉以清热，合之为辛凉，亦称解表清热"，辛则开皮毛，凉则冰伏汗液，欲使之汗出邪祛，但其效率并不高，而温则可以使汗速离肌腠，故辛温之药在解除表证上有着天然的优势，汗之得温则流行而散，得凉而易凝滞，发汗解表同治痰则理一，汗与痰均属于阴，故我们可以从"病痰饮者，当以温药和之"中得到启发，故在开表药中辛温药的解表能力远远强于辛凉药，但亦需就外感六淫邪气的性质不同而做出调整温凉比例之不同。\n\n如在温病中表闭轻者，可不用或少用辛温力量不重的开表药，豆豉、荆芥、苏叶之类；如表闭重者，加大辛温之力量，如张子培之银翘散中加麻黄绒，但亦需视情况而用，内热已盛，咽喉化脓，此时麻黄就不那么合适了。在伤寒中，内热重者亦需参入泄热品，如大青龙汤。辛温辛凉并用，仲景先师已肇事其端，如《伤寒论》麻黄升麻汤与《金匮要略》竹叶汤之辛凉辛温并用之法，金元以降，河间喜用寒凉，倡导表里寒凉治法，将辛温复辛凉法治热病的原则发扬光大，开后人不少法眼，虽某些制方粗糙，以大苦寒之品配伍大辛温之药，不若后世温病辨证用药之精准、轻灵，但其提出表里寒凉治法，辛温辛凉并用治温病的思想独超千古，河间真不愧为金元四大家之首。\n\n解表无非造汗、逼汗二端，对于造汗而言，即通过补充人体的气血阴阳，使之汗源充足，能够化汗的同时，视其皮毛卫表被闭的程度酌加表药，即景岳所谓"补虚亦能发表"：\n\n> Remark 1:\n>（1）虚+表证——>补虚+解表\n>（2）纯虚——>单纯补虚\n>（3）表邪+病理因食积等病理因素干扰了汗源的生成或发汗，治事宜温病中所云「透热转气」，即去除病理因素如痰、饮、水、湿、瘀、燥屎、食积等。\n\n基本的思路可以大致概括为麻桂/银翘/桑菊/羌独/艽己/艽防/柴葛/桑苏/荆防+四物/四君/六味/八味等，随证变法。',
  '解表剂的分类，宜注重"表"字，"表"指人体为外在六淫邪气所伤，教材上仅以辛温解表、辛凉解表、扶正解表三纲，余认为此种分类尚有可商榷之处。',
  'a1b2c3d4-e5f6-4890-abcd-ef1234567890',
  (SELECT id FROM categories WHERE slug = 'fangjixue'),
  ARRAY['方剂学', '解表剂', '分类'],
  'published',
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  excerpt = EXCLUDED.excerpt,
  category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  updated_at = NOW();

-- 4. 关联文章与标签
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.slug = 'jiebiao-introduction'
  AND t.slug IN ('fangjixue', 'jiebiaoji', 'fenlei')
ON CONFLICT DO NOTHING;
