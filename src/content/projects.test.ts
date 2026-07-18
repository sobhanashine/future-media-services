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
  it("keeps every featured project bilingual and linked to a live URL", () => {
    for (const project of featuredProjects) {
      expect(project.url).toMatch(/^https:\/\//);
      expect(project.images?.desktop).toMatch(/-desktop\.webp$/);
      expect(project.images?.tablet).toMatch(/-tablet\.webp$/);
      expect(project.images?.mobile).toMatch(/-mobile\.webp$/);
      expect(projectCopy(project, "fa").title).toBeTruthy();
      expect(projectCopy(project, "en").title).toBeTruthy();
      expect(project.technologies.length).toBeGreaterThan(0);
    }
  });

  it("gives every project a complete bilingual case-study record", () => {
    for (const project of projects) {
      for (const locale of ["fa", "en"] as const) {
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

  it("only puts live projects with verified imagery in the direct-link card grid", () => {
    expect(portfolioProjects).toHaveLength(8);
    for (const project of portfolioProjects) {
      expect(project.available).toBe(true);
      expect(project.images?.desktop).toBeTruthy();
    }
  });
});
