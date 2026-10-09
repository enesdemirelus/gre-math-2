// Usage: npx tsx scripts/check-section.ts <sectionId>  — validates a section file even if not registered yet.
process.argv.push("--section", process.argv[2]);
import("./check-content");
