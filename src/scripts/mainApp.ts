import { copyToClipboard, showToast } from '../utils/clipboard';

/**
 * Initializes the main interactive application logic for Git Command Web
 */
export function initGitCommandApp(): void {
  const hopButtons = document.querySelectorAll<HTMLButtonElement>('.hop-btn');
  const topicButtons = document.querySelectorAll<HTMLButtonElement>('.topic-tab-btn');
  const panels = document.querySelectorAll<HTMLElement>('.panel-card');
  const nodes = document.querySelectorAll<HTMLElement>('.node');
  const copyButtons = document.querySelectorAll<HTMLButtonElement>('.copy-btn');

  // Search elements
  const searchInput = document.getElementById('command-search') as HTMLInputElement | null;
  const searchFeedback = document.getElementById('search-feedback');
  const searchPanel = document.getElementById('panel-search');
  const searchResultsList = document.getElementById('search-results-list');
  const clearSearchBtn = document.getElementById('clear-search');

  let activeTargetId = 'add';

  // Node highlight mapping: hopId -> { fromNodeIndex, toNodeIndex }
  const hopNodeMap: Record<string, { from: number; to: number }> = {
    'add': { from: 0, to: 1 },
    'commit': { from: 1, to: 2 },
    'push': { from: 2, to: 3 },
    'pull': { from: 3, to: 0 }
  };

  function clearNodeHighlights(): void {
    nodes.forEach(node => {
      node.classList.remove('active-source', 'active-dest');
    });
  }

  function highlightNodesForHop(hopId: string): void {
    clearNodeHighlights();
    const mapping = hopNodeMap[hopId];
    if (!mapping) return;

    const fromEl = document.getElementById(`node-${mapping.from}`);
    const toEl = document.getElementById(`node-${mapping.to}`);

    if (fromEl) fromEl.classList.add('active-source');
    if (toEl) toEl.classList.add('active-dest');
  }

  function switchSection(targetId: string, isFromSearch = false): void {
    if (!isFromSearch && searchInput && searchInput.value.trim() !== '') {
      searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.hidden = true;
      if (searchFeedback) searchFeedback.textContent = '';
      if (searchPanel) searchPanel.hidden = true;
    }

    activeTargetId = targetId;

    // Update Hop buttons state
    hopButtons.forEach(btn => {
      const isMatch = btn.getAttribute('data-target') === targetId;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    // Update Topic buttons state
    topicButtons.forEach(btn => {
      const isMatch = btn.getAttribute('data-target') === targetId;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    // Toggle panels visibility
    panels.forEach(panel => {
      const panelId = panel.id.replace('panel-', '');
      panel.hidden = panelId !== targetId;
    });

    // Highlight source and destination nodes
    if (hopNodeMap[targetId]) {
      highlightNodesForHop(targetId);
    } else {
      clearNodeHighlights();
    }
  }

  // Bind Hop click listeners
  hopButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) switchSection(target);
    });
  });

  // Bind Topic click listeners
  topicButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) switchSection(target);
    });
  });

  // Reusable Copy button listener setup
  function setupCopyListener(button: HTMLButtonElement): void {
    button.addEventListener('click', async () => {
      const command = button.getAttribute('data-copy');
      if (!command) return;

      const success = await copyToClipboard(command);
      if (!success) return;

      // Tactical visual button feedback
      const btnText = button.querySelector<HTMLElement>('.btn-text');
      const isEn = document.documentElement.lang === 'en';
      const originalText = btnText?.textContent || (isEn ? 'Copy' : 'Copiar');

      button.classList.add('copied');
      if (btnText) btnText.textContent = isEn ? 'Copied!' : '¡Copiado!';

      showToast(isEn ? `Copied: "${command}"` : `Copiado: "${command}"`);

      setTimeout(() => {
        button.classList.remove('copied');
        if (btnText) btnText.textContent = originalText;
      }, 1800);
    });
  }

  copyButtons.forEach(setupCopyListener);

  // Set default active section
  switchSection('add');

  // Global live search functionality
  if (searchInput && searchResultsList && searchPanel) {
    const panelEl = searchPanel;
    const resultsListEl = searchResultsList;
    const inputEl = searchInput;

    const allCommandCards = Array.from(document.querySelectorAll<HTMLElement>('.command-card')).map(card => {
      const searchContent = card.getAttribute('data-command-search') || '';
      const clone = card.cloneNode(true) as HTMLElement;
      const copyBtn = clone.querySelector<HTMLButtonElement>('.copy-btn');
      if (copyBtn) setupCopyListener(copyBtn);
      return {
        content: searchContent.toLowerCase(),
        element: clone
      };
    });

    function handleSearch(): void {
      const query = inputEl.value.trim().toLowerCase();

      if (clearSearchBtn) {
        clearSearchBtn.hidden = query.length === 0;
      }

      if (query.length === 0) {
        if (searchFeedback) searchFeedback.textContent = '';
        panelEl.hidden = true;
        switchSection(activeTargetId, true);
        return;
      }

      // Ensure pipeline hub view is active
      const pipelineTabBtn = document.getElementById('tab-view-pipeline');
      if (pipelineTabBtn && !pipelineTabBtn.classList.contains('active')) {
        pipelineTabBtn.click();
      }

      // Hide panels and deselect active tabs
      panels.forEach(p => (p.hidden = true));
      clearNodeHighlights();
      hopButtons.forEach(b => b.classList.remove('active'));
      topicButtons.forEach(b => b.classList.remove('active'));

      // Filter cards matching query
      const matches = allCommandCards.filter(item => item.content.includes(query));

      resultsListEl.innerHTML = '';
      if (matches.length > 0) {
        matches.forEach(m => resultsListEl.appendChild(m.element.cloneNode(true)));
        resultsListEl.querySelectorAll<HTMLButtonElement>('.copy-btn').forEach(setupCopyListener);

        if (searchFeedback) {
          searchFeedback.textContent = `Se encontraron ${matches.length} comando${matches.length > 1 ? 's' : ''} que coinciden con "${query}"`;
        }
      } else {
        resultsListEl.innerHTML = `
          <div style="padding: 2.5rem 1rem; text-align: center; color: var(--text-muted);">
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-main);">No se encontraron comandos para "<strong>${query}</strong>"</p>
            <p style="font-size: 0.9rem;">Prueba con términos como: <code>status</code>, <code>branch</code>, <code>commit</code>, <code>reset</code> o <code>pull</code>.</p>
          </div>
        `;
        if (searchFeedback) searchFeedback.textContent = 'Sin resultados';
      }

      panelEl.hidden = false;
    }

    inputEl.addEventListener('input', handleSearch);

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        inputEl.value = '';
        handleSearch();
        inputEl.focus();
      });
    }
  }

  // Keyboard shortcut: "/" or "Ctrl+K" to focus search
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key === 'k')) && document.activeElement !== searchInput) {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    } else if (e.key === 'Escape' && document.activeElement === searchInput) {
      if (searchInput) {
        searchInput.value = '';
        searchInput.blur();
        switchSection(activeTargetId);
      }
    }
  });
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGitCommandApp);
  } else {
    initGitCommandApp();
  }
}
