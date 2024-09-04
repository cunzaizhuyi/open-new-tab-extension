export function handleMediumLinks(event: MouseEvent): boolean {
  const target = event.target as HTMLElement;
//   const link = target.closest('a');

  if (target && window.location.hostname === 'medium.com') {
    const divWithDataHref = target.closest('div[data-href]');
    if (divWithDataHref) {
      const dataHref = divWithDataHref.getAttribute('data-href');
      if (dataHref) {
        event.preventDefault();
        window.open(dataHref, '_blank');
        return true;
      }
    }
  }

  return false;
}
