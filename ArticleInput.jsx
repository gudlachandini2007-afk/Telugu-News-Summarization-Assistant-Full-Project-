import { useState } from "react";
import { generateHeadlines } from "../services/aiService";

import "../styles/articleInput.css";
import "../styles/button.css";
import "../styles/cards.css";

function ArticleInput() {
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);

  const [headlines, setHeadlines] = useState([]);
  const [subheadlines, setSubheadlines] = useState([]);

  const [selectedHeadline, setSelectedHeadline] = useState("");
  const [approvedHeadline, setApprovedHeadline] = useState("");

  const handleGenerate = async () => {
    if (!article.trim()) {
      alert("Please paste a news article");
      return;
    }

    setLoading(true);

    const data = await generateHeadlines(article);

    setHeadlines(data.headlines || []);
    setSubheadlines(data.subheadlines || []);

    setSelectedHeadline("");
    setApprovedHeadline("");

    setLoading(false);
  };

  return (
    <div className="article-container">
      <textarea
        value={article}
        onChange={(e) => setArticle(e.target.value)}
        placeholder="Paste Telugu or English news article here..."
      />

      <div className="stats-row">
        <p>Characters: {article.length}</p>

        <p>
          Words:{" "}
          {article.trim()
            ? article.trim().split(/\s+/).length
            : 0}
        </p>
      </div>

      <button
        className="generate-btn"
        onClick={handleGenerate}
      >
        {loading
          ? "Generating..."
          : "Generate Headlines"}
      </button>

      {headlines.length > 0 && (
        <>
          <h2 className="section-title">
            Headline Suggestions
          </h2>

          {headlines.map((headline, index) => (
            <div className="result-card" key={index}>
              <label className="headline-option">
                <input
                  type="radio"
                  name="headline"
                  value={headline}
                  checked={selectedHeadline === headline}
                  onChange={(e) =>
                    setSelectedHeadline(
                      e.target.value
                    )
                  }
                />

                {headline}
              </label>
            </div>
          ))}

          <button
            className="approve-btn"
            onClick={() => {
              if (!selectedHeadline) {
                alert(
                  "Select a headline first"
                );
                return;
              }

              setApprovedHeadline(
                selectedHeadline
              );
            }}
          >
            Approve Selected Headline
          </button>

          {approvedHeadline && (
            <div className="approved-box">
              <h3>
                Approved Headline
              </h3>

              <p>{approvedHeadline}</p>
            </div>
          )}

          <h2 className="section-title">
            Subheadline Suggestions
          </h2>

          {subheadlines.map((sub, index) => (
            <div className="result-card" key={index}>
              {sub}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ArticleInput;