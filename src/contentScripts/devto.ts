export function handleDevto(event: MouseEvent): void {

    if (window.location.hostname !== 'dev.to') return;


    // 适用于大多数网站的 通用逻辑
    const target = event.target as HTMLElement;
    const link = target.closest('a');
    if (link instanceof HTMLAnchorElement && link.href) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      window.open(link.href, '_blank');
    }
}