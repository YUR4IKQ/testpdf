import React, { useState } from 'react';
import './App.css'
import { Document, Page, pdfjs } from 'react-pdf';
import { scroller } from 'react-scroll';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'pdfjs-dist/build/pdf.worker.mjs';
pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.mjs';

interface PDFViewerProps {
  file: string;
  references: { content: string }[];
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file, references }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [textLayerRefs, setTextLayerRefs] = useState<(HTMLDivElement | null)[]>([]);
  
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setTextLayerRefs(Array(numPages).fill(null));
    };
  
    const scrollToText = (text: string) => {
      textLayerRefs.forEach((textLayer, pageIndex) => {
        if (textLayer) {
          const spans = textLayer.querySelectorAll('span');
          spans.forEach((span) => {
            if (span.textContent && span.textContent.includes(text)) {
              span.style.backgroundColor = 'yellow';
              scroller.scrollTo(`page_${pageIndex}`, {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart',
                containerId: 'pdfViewerId',
              });
            }
          });
        }
      });
    };
  
    return (
      <div id="pdf-container" style={{ height: '100vh', overflowY: 'auto' }}>
          <div className='buttons'>
        {references.map((ref, index) => (
          <button key={index} onClick={() => scrollToText(ref.content)}>
             {ref.content}
          </button>
        ))}
        </div>
        <div id='pdfViewerId' className='pdfViewer'>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index}`} id={`page_${index}`}>
              <Page
                pageNumber={index + 1}
                renderTextLayer
                customTextRenderer={({ str }) => str}
                onRenderSuccess={(page) => {
                  const textLayer = page.getTextContent();
                  
                  textLayer.then((content) => {
                    console.log(content);
                    
                    const div = document.getElementById(`page_${index}`)?.querySelector('.react-pdf__Page__textContent');
                    div?.setAttribute('style','display:none');
                    if (div) {
                      setTextLayerRefs((prev) => {
                        
                        
                        const newRefs = [...prev];
                        newRefs[index] = div as HTMLDivElement;
                        return newRefs;
                      });
                    }
                  });
                }}
              />
            </div>
          ))}
        </Document>
        </div>

      </div>
    );
  };
  
  export default PDFViewer;

