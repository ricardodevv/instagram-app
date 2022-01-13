import Stories from "./Stories";

const Feed = () => {
  return (
    <main
      className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl 
    xl:grid-cols-3 xl:max-w-6xl max-auto"
    >
      <section className="col-span-2">
        {/* // * Stories */}
        <Stories />

        {/* // * Posts */}
      </section>

      {/* // * Mini profile */}
      {/* // * Suggestions  */}
    </main>
  );
};

export default Feed;