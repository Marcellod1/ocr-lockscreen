$(document).ready(function(){

    const worker = Tesseract.createWorker({
        logger: m => console.log(m)
      });
      
      (async () => {
        await worker.load();
        await worker.loadLanguage('jpn');
        await worker.initialize('jpn');
        const { data: { text } } = await worker.recognize('../resources/img/wa.png');
        console.log(text);
        await worker.terminate();
      })();
});