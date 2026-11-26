import { describe, expect, it } from "vitest";
import {
  additionalProjects,
  featuredProjects,
  findProject,
  portfolioProjects,
  projectCopy,
  projects,
  projectSlugs,
} from "./projects";

describe("portfolio content", () => {
  it("keeps every featured project bilingual and linked to a project URL", () => {
    for (const project of featuredProjects) {
      expect(project.url).toMatch(/^https:\/\//);
      expect(project.images?.desktop).toMatch(/-desktop\.webp$/);
      expect(project.images?.tablet).toMatch(/-tablet\.webp$/);
      expect(project.images?.mobile).toMatch(/-mobile\.webp$/);
      expect(project.images?.mockup).toMatch(/\/mockups\/.+-mockup\.webp$/);
      expect(projectCopy(project, "fa").title).toBeTruthy();
      expect(projectCopy(project, "en").title).toBeTruthy();
      expect(project.technologies.length).toBeGreaterThan(0);
    }
  });

  it("gives every project a complete case study in every language", () => {
    for (const project of projects) {
      for (const locale of ["fa", "en", "it"] as const) {
        const copy = projectCopy(project, locale);
        expect(copy.summary).toBeTruthy();
        expect(copy.challenge).toBeTruthy();
        expect(copy.approach).toBeTruthy();
        expect(copy.highlights.length).toBeGreaterThanOrEqual(4);
        expect(copy.sourceNote).toBeTruthy();
      }
      expect(findProject(project.slug)).toBe(project);
    }

    expect(new Set(projectSlugs).size).toBe(projects.length);
  });

  it("does not duplicate portfolio destinations", () => {
    const urls = [...featuredProjects, ...additionalProjects].map((project) => project.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("uses case-study metadata for search queries that look navigational", () => {
    const paytakhte = findProject("paytakhte-ketab")?.copy.fa.seo;
    const jaheshino = findProject("jaheshino")?.copy.fa.seo;

    expect(paytakhte?.title).toContain("مطالعه موردی طراحی فروشگاه آنلاین");
    expect(jaheshino?.title).toContain("مطالعه موردی طراحی پلتفرم آموزشی");
    for (const metadata of [paytakhte, jaheshino]) {
      expect(metadata?.title.length).toBeLessThanOrEqual(60);
      expect(metadata?.description.length).toBeGreaterThanOrEqual(100);
      expect(metadata?.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("keeps project imagery accessible even when a live site is unavailable", () => {
    expect(portfolioProjects).toHaveLength(11);
    expect(findProject("digimoragheb")?.available).toBe(false);
    for (const project of portfolioProjects) {
      expect(project.images?.desktop).toBeTruthy();
      expect(project.images?.mobile).toBeTruthy();
      expect(project.images?.mockup).toBeTruthy();
    }
  });

  it("uses Future Media Services records and excludes the removed coworking project", () => {
    expect(projectSlugs).not.toContain("sakkou-cowork");
    for (const project of projects) {
      expect(project.copy.en.sourceNote).toContain("Future Media Services");
      expect(project.copy.fa.sourceNote).toContain("Future Media Services");
    }
  });
});
