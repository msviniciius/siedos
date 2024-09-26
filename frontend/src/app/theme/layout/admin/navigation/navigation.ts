import { Injectable } from '@angular/core';
import { ApiAuthService } from '../../../../services/auth/api-auth.service';
import { UserAuthService } from '../../../../services/auth/user_auth.service';


export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  requiredRole?: string;
}

const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'configuracoes',
    title: 'Configurações',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'employees',
        title: 'Funcionários',
        type: 'item',
        classes: 'nav-item',
        url: '/funcionarios',
        icon: 'ti ti-archive'
      },
      {
        id: 'users',
        title: 'Usuários',
        type: 'item',
        classes: 'nav-item',
        url: '/usuarios',
        icon: 'ti ti-user',
        requiredRole: 'admin'
      },
      {
        id: 'notifications',
        title: 'Notificações',
        type: 'item',
        classes: 'nav-item',
        url: '/notification',
        icon: 'ti ti-notification',
      },
      {
        id: 'auditoria',
        title: 'Auditoria',
        type: 'item',
        classes: 'nav-item',
        url: '/auditoria',
        icon: 'ti ti-user-edit',
        requiredRole: 'admin'
      }
    ]
  }
];

@Injectable()
export class NavigationService {
  loading: boolean = false;
  userRole: string | null = null;
  userInfo: UserAuthService.Content;

  constructor(
    private apiAuthService: ApiAuthService
  ) {
    this.getUser();
   }

  get() {
    return this.filterNavigationItems(NavigationItems);
  }
  
  filterNavigationItems(items: NavigationItem[]): NavigationItem[] {
    const userRole = localStorage.getItem('user_role');

    return items.map(item => {
      // Se o item tem filhos, filtramos os filhos também
      if (item.children) {
        item.children = this.filterNavigationItems(item.children);
      }

      // Se o item requer um papel específico, verificamos se o usuário tem esse papel
      if (item.requiredRole && item.requiredRole !== userRole) {
        return null; // Retorna null se o papel não corresponde
      }

      return item; // Retorna o item se não há filtro ou o papel corresponde
    }).filter(item => item !== null); // Remove os itens null
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUser(): void {
    this.loading = true;
    const token = this.getToken();
  
    this.apiAuthService.getUser(token)
      .then(user => {
        this.userRole = user.role;
        localStorage.setItem('user_role', this.userRole);
      })
      .catch(error => {
        console.error('Erro ao carregar informações do usuário:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
