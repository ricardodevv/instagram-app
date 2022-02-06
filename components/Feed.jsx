import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";

const Feed = () => {
  return (
    <div className="sm:mx-[1rem]">
      <main
        className="grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl 
        xl:grid-cols-3 xl:max-w-4xl"
      >
        <section className="col-span-2">
          {/* // * Stories */}
          <Stories />

          {/* // * Posts */}
          <Posts />
        </section>

        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-16">
            {/* // * Mini profile */}
            <MiniProfile />
            {/* // * Suggestions  */}
            <Suggestions />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Feed;
