import { describe, expect, it } from "vitest";
import { additionalProjects, featuredProjects, projectCopy } from "./projects";

describe("portfolio content", () => {
  it("keeps every featured project bilingual and linked to a live URL", () => {
    for (const project of featuredProjects) {
      expect(project.url).toMatch(/^https:\/\//);
      expect(project.image).toMatch(/^\/projects\//);
      expect(projectCopy(project, "fa").title).toBeTruthy();
      expect(projectCopy(project, "en").title).toBeTruthy();
      expect(project.technologies.length).toBeGreaterThan(0);
    }
  });

  it("does not duplicate portfolio destinations", () => {
    const urls = [...featuredProjects, ...additionalProjects].map((project) => project.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
