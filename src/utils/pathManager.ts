class PathManager {
  isActive(currentPath: string, href: string) {
    const current = this.removeTrailingSlash(currentPath);
    const target = this.removeTrailingSlash(href);

    if (target === "/") return current === "/";
    return current === target || current.startsWith(`${target}/`);
  }

  private removeTrailingSlash(path: string) {
    if (path !== "/" && path.endsWith("/")) {
      return path.slice(0, -1);
    }
    return path;
  }
}

export const pathManager = new PathManager();
