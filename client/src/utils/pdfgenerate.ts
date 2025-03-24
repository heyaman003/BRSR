export const extractToPdf = async (sectionId: string) => {
    const raw = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/section/${sectionId}/extract`,
      {
        headers: {
          'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || ''
        },
        credentials: 'include'
      }
    );


    if(raw.status<200 || raw.status>=400){
      const res = await raw.json()
      throw new Error(res.message);
    }

    const blob: Blob = await raw.blob();

    const url: string = window.URL.createObjectURL(blob);

    const a: HTMLAnchorElement = document.createElement('a');

    a.href = url;

    a.download = sectionId;

    document.body.appendChild(a);

    a.click();

    a.remove()

    return 'Extracted section to PDF successfully.'

};