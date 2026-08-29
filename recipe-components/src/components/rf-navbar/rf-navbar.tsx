import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'rf-navbar',
  styleUrl: 'rf-navbar.css',
  shadow: true,
})
export class RfNavbar {
  @Prop() brandName: string = 'TasteCraft';
  @Prop() activeRoute: string = '/';

  @Event() rfNavigate!: EventEmitter<{ path: string }>;

  private navigate = (path: string, e: MouseEvent) => {
    e.preventDefault();
    this.rfNavigate.emit({ path });
  };

  render() {
    const navItems = [
      { path: '/', label: 'Discover', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
      { path: '/my-recipes', label: 'My Recipes', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
      { path: '/favorites', label: 'Favorites', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
      { path: '/meal-planner', label: 'Meal Planner', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    ];

    return (
      <header class="navbar">
        <div class="navbar-container">
          <a href="/" class="brand" onClick={(e) => this.navigate('/', e)}>
            <slot name="brand">
              <div class="brand-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span class="brand-name">{this.brandName}</span>
            </slot>
          </a>

          <nav class="nav-menu">
            {navItems.map(item => {
              const isActive = this.activeRoute === item.path || (item.path !== '/' && this.activeRoute.startsWith(item.path));
              return (
                <a
                  href={item.path}
                  class={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => this.navigate(item.path, e)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d={item.icon} stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div class="nav-actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </header>
    );
  }
}
