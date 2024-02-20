import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { PostInterface } from "./types";
import SadSVG from "../../assets/sad.svg";
import { colors } from "../../theme";
import { PostCard } from "./PostCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { NewPostModal } from "./NewPostModal";
import { CommentsModal } from "./CommentsModal";

interface FeedProps {
  posts: PostInterface[];
  fakeReload?: () => void;
}

export const Feed: React.FC<FeedProps> = ({ posts, fakeReload }) => {
  const user = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filteredPosts, setFilteredPosts] = useState<PostInterface[]>(posts);
  const filters = useSelector((state: RootState) => state.course.filters);
  const sideSorting = useSelector(
    (state: RootState) => state.course.sideSorting
  );
  const sideFilters = useSelector(
    (state: RootState) => state.course.sideFilters
  );

  const [editValues, setEditValues] = useState<
    | {
        title: string;
        description: string;
        postId: string;
      }
    | undefined
  >(undefined);

  //used for comments modal
  const [currentPost, setCurrentPost] = useState<PostInterface | null>(null);
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);

  useEffect(() => {
    let sorted;

    if (fakeReload === undefined) {
      //on course page
      switch (sideSorting.sortBy) {
        case "newest":
          sorted = [
            ...posts.filter((post) => post.classSection === filters.section),
          ].sort((a, b) => {
            const aDate = new Date(a.createdAt);
            const bDate = new Date(b.createdAt);

            return aDate > bDate ? -1 : 1;
          });
          break;

        case "oldest":
          sorted = [
            ...posts.filter((post) => post.classSection === filters.section),
          ].sort((a, b) => {
            const aDate = new Date(a.createdAt);
            const bDate = new Date(b.createdAt);

            return aDate < bDate ? -1 : 1;
          });
          break;

        case "leastlikes":
          sorted = [
            ...posts.filter((post) => post.classSection === filters.section),
          ].sort((a, b) => {
            return a.likes.length - b.likes.length;
          });

          break;

        case "mostlikes":
          sorted = [
            ...posts.filter((post) => post.classSection === filters.section),
          ].sort((a, b) => {
            return b.likes.length - a.likes.length;
          });

          break;

        default:
          sorted = posts.filter(
            (post) => post.classSection === filters.section
          );
          break;
      }

      switch (sideFilters.filterBy) {
        case "postsi'veliked":
          setFilteredPosts(
            sorted
              .filter((post) => post.classSection === filters.section)
              .filter((post) => {
                return post.likes
                  .map((like) => like.userId)
                  .includes(user?.id ?? "");
              })
          );
          break;

        case "myposts":
          setFilteredPosts(
            sorted
              .filter((post) => post.classSection === filters.section)
              .filter((post) => {
                return post.userId === user?.id;
              })
          );
          break;

        default:
          setFilteredPosts(sorted);
          break;
      }
    } else {
      //on profile page, forum === all posts
      if (filters.section === "forum") setFilteredPosts(posts);
      else
        setFilteredPosts(
          posts.filter((post) => post.classSection === filters.section)
        );
    }
  }, [sideSorting, sideFilters, posts, filters]);

  useEffect(() => {
    dispatch({
      type: "course/setFilters",
      payload: { section: "materials" },
    });

    return () => {
      dispatch({ type: "course/setSideSorting", payload: { sortBy: null } });
      dispatch({ type: "course/setSideFilters", payload: { filterBy: null } });
    };
  }, []);

  useEffect(() => {
    if (editValues) {
      onOpen();
    }
  }, [editValues]);

  useEffect(() => {
    if (currentPost) {
      setCommentsOpen(true);
    }
  }, [currentPost]);

  const openCommentsModal = (post: PostInterface) => {
    setCurrentPost(post);
  };

  const openEditModal = (initialValues: {
    title: string;
    description: string;
    postId: string;
  }) => {
    setEditValues(initialValues);
  };

  const handleCloseComments = () => {
    setCommentsOpen(false);
    setCurrentPost(null);
  };

  return (
    <Flex
      direction={"column"}
      maxH={"83vh"}
      width={"80vw"}
      flex={1}
      overflowY={"scroll"}
      p={10}
      gap={10}
    >
      <NewPostModal
        isOpen={isOpen}
        onClose={onClose}
        classId={""}
        userId={""}
        initialValues={editValues}
        fakeReload={fakeReload}
      />

      <CommentsModal
        isOpen={commentsOpen}
        onClose={handleCloseComments}
        post={currentPost}
      />

      {filteredPosts.length === 0 ? (
        <Flex
          flex={1}
          width="100%"
          align="center"
          justify="center"
          direction="column"
        >
          <Image src={SadSVG} />
          <Text
            marginTop={5}
            fontFamily="WorkSans-SemiBold"
            fontSize={20}
            color={colors.white}
          >
            There are no posts yet.
          </Text>
        </Flex>
      ) : (
        <>
          {filteredPosts.map((post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                openEditModal={openEditModal}
                openCommentsModal={openCommentsModal}
                fakeReload={fakeReload}
              />
            );
          })}
        </>
      )}
    </Flex>
  );
};
