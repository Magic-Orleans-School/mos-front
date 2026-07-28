import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Markdown.module.css';

interface Props {
  content: string;
}

// react-markdown n'interprète pas le HTML brut par défaut (rehype-raw non activé) :
// tout HTML éventuel s'affiche comme texte, ce qui protège du XSS.
export default function Markdown({ content }: Props) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
