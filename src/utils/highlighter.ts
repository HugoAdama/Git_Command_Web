/**
 * Formats command argument placeholders like <archivo>, <url>, and flags
 * with styled HTML markup tokens.
 */
export function highlightCommandTokens(command: string): string {
  return command.replace(
    /(&lt;[^&]+&gt;|<[^>]+>)/g,
    '<mark class="arg-token">$1</mark>'
  );
}
