import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  BarChart3, 
  Search as SearchIcon, 
  Utensils, 
  Activity, 
  Leaf, 
  ChefHat 
} from 'lucide-react';

const CATEGORIES = ['Vegetable', 'Protein', 'Fruit', 'Grain', 'Snack', 'Liquid', 'Other'];

export default function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('food-entries');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [newEntry, setNewEntry] = useState({
    name: '',
    category: 'Vegetable',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  useEffect(() => {
    localStorage.setItem('food-entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (e) => {
    e.preventDefault();
    if (!newEntry.name || !newEntry.calories) return;

    const entry = {
      ...newEntry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      calories: Number(newEntry.calories),
      protein: Number(newEntry.protein || 0),
      carbs: Number(newEntry.carbs || 0),
      fat: Number(newEntry.fat || 0)
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      name: '',
      category: 'Vegetable',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const filteredEntries = entries.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || e.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totals = entries.reduce((acc, curr) => ({
    calories: acc.calories + curr.calories,
    protein: acc.protein + curr.protein,
    carbs: acc.carbs + curr.carbs,
    fat: acc.fat + curr.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="app-container">
      <header className="animate-fade-in" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
          NutriTrack
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          Your premium fuel companion
        </p>
      </header>

      {/* Daily Stats Dashboard */}
      <section className="grid grid-cols-3 animate-fade-in" style={{ marginBottom: '3rem', animationDelay: '0.1s' }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <Activity size={32} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Calories</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>{totals.calories} <span style={{ fontSize: '1rem', fontWeight: 400 }}>kcal</span></p>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <ChefHat size={32} color="#60a5fa" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Protein</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>{totals.protein} <span style={{ fontSize: '1rem', fontWeight: 400 }}>g</span></p>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <Leaf size={32} color="#a78bfa" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Carbs/Fat</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {totals.carbs}g <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>/</span> {totals.fat}g
          </p>
        </div>
      </section>

      <div className="grid grid-cols-2">
        {/* Log Submission Form */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <Plus className="btn-primary" style={{ padding: '0.5rem', borderRadius: '50%' }} size={32} />
              <h2 style={{ fontSize: '1.5rem' }}>Log Food Intake</h2>
            </div>
            
            <form onSubmit={addEntry} style={{ display: 'grid', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Food Name</label>
                <input 
                  placeholder="What did you eat?"
                  value={newEntry.name}
                  onChange={e => setNewEntry({...newEntry, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Category</label>
                <select 
                  value={newEntry.category}
                  onChange={e => setNewEntry({...newEntry, category: e.target.value})}
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Calories (kcal)</label>
                  <input 
                    type="number"
                    placeholder="250"
                    value={newEntry.calories}
                    onChange={e => setNewEntry({...newEntry, calories: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Protein (g)</label>
                  <input 
                    type="number"
                    placeholder="15"
                    value={newEntry.protein}
                    onChange={e => setNewEntry({...newEntry, protein: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Carbs (g)</label>
                  <input 
                    type="number"
                    placeholder="30"
                    value={newEntry.carbs}
                    onChange={e => setNewEntry({...newEntry, carbs: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Fat (g)</label>
                  <input 
                    type="number"
                    placeholder="8"
                    value={newEntry.fat}
                    onChange={e => setNewEntry({...newEntry, fat: e.target.value})}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                Log Food Entry
              </button>
            </form>
          </div>
        </section>

        {/* Search and History */}
        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="glass-card" style={{ height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <SearchIcon size={24} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.5rem' }}>Recent History</h2>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input 
                  placeholder="Search foods..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ flex: 1 }}
                />
                <select 
                  style={{ width: '120px' }}
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                >
                  <option value="All">All</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {filteredEntries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  <Utensils size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                  <p>No entries found</p>
                </div>
              ) : (
                filteredEntries.map(entry => (
                  <div key={entry.id} className="glass-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transform: 'none' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{entry.name}</span>
                        <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px', color: 'var(--text-secondary)' }}>
                          {entry.category}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                        {entry.calories} kcal • {entry.protein}g P • {entry.carbs}g C • {entry.fat}g F
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      className="btn-ghost" 
                      style={{ padding: '0.5rem', color: 'var(--danger)' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
