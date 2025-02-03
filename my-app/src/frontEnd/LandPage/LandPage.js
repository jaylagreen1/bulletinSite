import React from 'react';
import './LandPage.css';

const FeaturedGroups = [
  { id: 1, name: "GroupName1", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
  { id: 2, name: "GroupName2", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
  { id: 3, name: "GroupName3", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
  { id: 4, name: "GroupName4", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
  { id: 5, name: "GroupName5", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
  { id: 6, name: "GroupName6", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
];
const MyGroups = [
  { id: 1, name: "GroupName1", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
  { id: 2, name: "GroupName2", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
  { id: 3, name: "GroupName3", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
  { id: 4, name: "GroupName4", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
  { id: 5, name: "GroupName5", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
  { id: 6, name: "GroupName6", image: "https://st.depositphotos.com/2274151/3518/i/950/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg" },
];

function LandPage() {
  return (
    <div>
      {/* Header */}
      <header>
        <h1>Landing Page Heading</h1>
      </header>

      {/* Main Content */}
      <main>
        {/* Group Cards Section */}
        <div>
          <h2>Featured Groups</h2>
          <div className="scroll-container">
            {FeaturedGroups.map((group) => (
              <div key={group.id} className="group-card">
                <img src={group.image} alt={group.name} />
                <p>{group.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2>My Groups</h2>
          <div className="scroll-container">
            {MyGroups.map((group) => (
              <div key={group.id} className="group-card">
                <img src={group.image} alt={group.name} />
                <p>{group.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Content (Optional) */}
        <div>
          <h2>More Details</h2>
          <p>group details</p>
          <button>button</button>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 1/31/2025 -sid</p>
      </footer>
    </div>
  );
}

export default LandPage;

