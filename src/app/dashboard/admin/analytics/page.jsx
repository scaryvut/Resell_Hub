export default function AdminAnalytics() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Platform Analytics
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow">
          📈 User Growth Chart (Fake)
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          📊 Monthly Orders Chart (Fake)
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          🛒 Category Performance
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          💰 Revenue Overview
        </div>
      </div>
    </div>
  );
}