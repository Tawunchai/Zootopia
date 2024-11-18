import React, { useEffect, useState } from "react";
import { ReviewInterface } from "../../interface/IReview";
import { ListReview, GetUserByIdReview } from "../../services/https";
import { FaStar } from "react-icons/fa";
import { Card } from "antd";
import "./review.css";
const review = () => {
  const [filteredReviews, setFilteredReviews] = useState<ReviewInterface[]>([]);
  const [userNames, setUserNames] = useState<string[]>([]);
  const [userProfiles, setUserProfiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getReviews = async () => {
    try {
      const res = await ListReview();
      if (res) {
        setFilteredReviews(res.slice(0, 4));

        const userPromises = res.map(async (review) => {
          if (review.UserID) {
            const { profile, fullName } = await getUserNameAndProfileById(
              review.UserID
            );
            return { name: fullName, profile };
          }
          return { name: "Unknown User", profile: "" };
        });

        const userInfos = await Promise.all(userPromises);
        setUserNames(userInfos.map((info) => info.name));
        setUserProfiles(userInfos.map((info) => info.profile));
      }
    } catch (err) {
      setError("Failed to fetch reviews");
      console.error(err);
    }
  };

  const getUserNameAndProfileById = async (id: number) => {
    const user = await GetUserByIdReview(id);
    if (user) {
      return {
        fullName: `${user.FirstName ?? ""} ${user.LastName ?? ""}`,
        profile: user.Profile || "",
      };
    }
    return { fullName: "", profile: "" };
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return "Unknown Date";
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStarsUser = (rating: number = 0) => (
    <div className="star-container">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={index < rating ? "star-color-rating" : "star-color-fail"}
        />
      ))}
    </div>
  );

  const truncateComment = (comment?: string) => {
    if (!comment) return "";
    return comment.length > 100 ? `${comment.slice(0, 100)}...` : comment;
  };

  const renderComment = (comment?: string) => {
    if (!comment) return null;
    const truncatedComment = truncateComment(comment);
    return <span dangerouslySetInnerHTML={{ __html: truncatedComment }} />;
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div>
      <header>
        <center className="reviews-overview">
          <h1>What Our Visitors Say</h1>
        </center>
      </header>

      <body>
        <div className="box-course-profile">
          {error ? (
            <p>{error}</p>
          ) : filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <Card key={review.ID}>
                <div className="review-container">
                  <img
                    src={userProfiles[index] || ""}
                    className="review-profile-img"
                    alt="User Profile"
                  />
                  <div className="reviews-comment-text">
                    <p>Name: {userNames[index] ?? "Unknown User"}</p>
                    <p>
                      Rating:{" "}
                      <span className="rating-stars">
                        {renderStarsUser(review.Rating ?? 0)}
                      </span>
                      <span className="date-review">
                        {formatDate(review.ReviewDate)}
                      </span>
                    </p>
                    <p>{renderComment(review.Comment)}</p>
                  </div>
                  <hr />
                </div>
              </Card>
            ))
          ) : (
            <p>No Reviews Found.</p>
          )}
        </div>
      </body>

      <footer>
        <center className="reviews-readmore">
          <h1>Read More Visitor Reviews</h1>
        </center>
      </footer>
    </div>
  );
};

export default review;
