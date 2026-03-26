import { isValidElement, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import topics from '../data/topics';
import topicContent from '../data/topicContent';
import PageTransition from '../components/PageTransition';

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      return;
    }
  };

  return (
    <button
      type="button"
      className={`copy-btn ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
      aria-label={copied ? 'Code copied to clipboard' : 'Copy code block'}
      title={copied ? 'Code copied to clipboard' : 'Copy code block'}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function CodeBlock({ code, className }) {
  const codeString = code.replace(/\n$/, '');

  return (
    <div className="code-block">
      <CopyButton code={codeString} />
      <pre>
        <code className={className}>{codeString}</code>
      </pre>
    </div>
  );
}

export default function LearnTopic() {
  const { topicId } = useParams();

  const topicIndex = topics.findIndex((topic) => topic.id === topicId);
  const topic = topics[topicIndex];
  const prevTopic = topicIndex > 0 ? topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null;
  const content =
    topicContent[topicId] ?? '# Topic not found\n\nThe requested topic does not exist.';

  if (!topic) {
    return (
      <div className="learning-page">
        <h1>Topic Not Found</h1>
        <p>
          <Link to="/">Return to Home</Link>
        </p>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="learning-page">
      <div className="learning-header">
        <span className="topic-badge">
          Topic {String(topicIndex + 1).padStart(2, '0')} — {topic.category}
        </span>
        <h1>{topic.title}</h1>
      </div>

      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            pre({ children }) {
              const child = Array.isArray(children) ? children[0] : children;

              if (!isValidElement(child)) {
                return <pre>{children}</pre>;
              }

              const rawCode = child.props.children;
              const code = Array.isArray(rawCode)
                ? rawCode.join('')
                : String(rawCode ?? '');

              return <CodeBlock className={child.props.className} code={code} />;
            },
            code({ className, children, ...props }) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      <div className="topic-nav">
        {prevTopic ? (
          <Link to={`/learn/${prevTopic.id}`}>
            <span className="nav-label">← Previous</span>
            <span className="nav-title">{prevTopic.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <Link to={`/learn/${nextTopic.id}`} className="next">
            <span className="nav-label">Next →</span>
            <span className="nav-title">{nextTopic.title}</span>
          </Link>
        ) : (
          <Link to="/mcq" className="next">
            <span className="nav-label">Next →</span>
            <span className="nav-title">Practice MCQs</span>
          </Link>
        )}
      </div>
    </div>
    </PageTransition>
  );
}
