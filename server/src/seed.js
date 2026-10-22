const { connectDb, MONGODB_URI } = require("./db");
const { Article, CaseStudy, Platform, SupportPackage, TeamMember, Stat } = require("./models");
const content = require("./data/content");

async function seed() {
  await connectDb();
  const collections = [Article, CaseStudy, Platform, SupportPackage, TeamMember, Stat];
  await Promise.all(collections.map((model) => model.deleteMany({})));

  await Article.insertMany(
    content.articles.map((doc, order) => ({ ...doc, newBadge: doc.isNew, order }))
  );
  await CaseStudy.insertMany(content.caseStudies.map((doc, order) => ({ ...doc, order })));
  await Platform.insertMany(content.platforms.map((doc, order) => ({ ...doc, order })));
  await SupportPackage.insertMany(content.packages.map((doc, order) => ({ ...doc, order })));
  await TeamMember.insertMany(content.team.map((doc, order) => ({ ...doc, order })));
  await Stat.insertMany(content.stats.map((doc, order) => ({ ...doc, order })));

  const counts = {
    articles: await Article.countDocuments(),
    caseStudies: await CaseStudy.countDocuments(),
    platforms: await Platform.countDocuments(),
    packages: await SupportPackage.countDocuments(),
    team: await TeamMember.countDocuments(),
    stats: await Stat.countDocuments(),
  };
  console.log(`Seeded ${MONGODB_URI}`, counts);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
