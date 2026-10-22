const { Router } = require("express");
const { Article, CaseStudy, Platform, SupportPackage, TeamMember, Stat } = require("../models");

const router = Router();

async function latestArticles(req, res, next) {
  try {
    res.json(await Article.find({}).sort({ order: 1 }).limit(3).lean());
  } catch (err) {
    next(err);
  }
}

async function listArticles(req, res, next) {
  try {
    const filter = req.query.tag ? { tag: req.query.tag } : {};
    res.json(await Article.find(filter).sort({ order: 1 }).lean());
  } catch (err) {
    next(err);
  }
}

async function articleTags(req, res, next) {
  try {
    res.json(await Article.distinct("tag"));
  } catch (err) {
    next(err);
  }
}

async function articleDetail(req, res, next) {
  try {
    const ordered = await Article.find({}).sort({ order: 1 }).lean();
    const index = ordered.findIndex((a) => a.slug === req.params.slug);
    if (index === -1) return res.status(404).json({ ok: false, error: "Article not found." });
    res.json({
      article: ordered[index],
      prev: ordered[index - 1] || null,
      next: ordered[index + 1] || null,
    });
  } catch (err) {
    next(err);
  }
}

async function listCaseStudies(req, res, next) {
  try {
    res.json(await CaseStudy.find({}).sort({ order: 1 }).lean());
  } catch (err) {
    next(err);
  }
}

async function caseStudyDetail(req, res, next) {
  try {
    const all = await CaseStudy.find({}).sort({ order: 1 }).lean();
    const study = all.find((s) => s.slug === req.params.slug);
    if (!study) return res.status(404).json({ ok: false, error: "Case study not found." });
    res.json({ study, others: all.filter((s) => s.slug !== study.slug).slice(0, 3) });
  } catch (err) {
    next(err);
  }
}

async function listPlatforms(req, res, next) {
  try {
    res.json(await Platform.find({}).sort({ order: 1 }).lean());
  } catch (err) {
    next(err);
  }
}

async function platformDetail(req, res, next) {
  try {
    const all = await Platform.find({}).sort({ order: 1 }).lean();
    const platform = all.find((p) => p.slug === req.params.slug);
    if (!platform) return res.status(404).json({ ok: false, error: "Platform not found." });
    res.json({
      platform,
      otherPlatforms: all.filter((p) => p.slug !== platform.slug).slice(0, 4),
    });
  } catch (err) {
    next(err);
  }
}

router.get("/articles", listArticles);
router.get("/articles/latest", latestArticles);
router.get("/articles/tags", articleTags);
router.get("/articles/:slug", articleDetail);
router.get("/case-studies", listCaseStudies);
router.get("/case-studies/:slug", caseStudyDetail);
router.get("/platforms", listPlatforms);
router.get("/platforms/:slug", platformDetail);

router.get("/packages", async (req, res, next) => {
  try {
    res.json(await SupportPackage.find({}).sort({ order: 1 }).lean());
  } catch (err) {
    next(err);
  }
});

router.get("/team", async (req, res, next) => {
  try {
    res.json(await TeamMember.find({}).sort({ order: 1 }).lean());
  } catch (err) {
    next(err);
  }
});

router.get("/stats", async (req, res, next) => {
  try {
    res.json(await Stat.find({}).sort({ order: 1 }).lean());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
