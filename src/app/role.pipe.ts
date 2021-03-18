import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role',
})
export class RolePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const roles = {
      ROLE_ADMIN: `Vous pouvez acceder à la page d'administation, supprimer un article, bloquer des commentaires, modifier la catégorie d'un article, et en créer de nouvelles`,
      ROLE_MODERATOR: `Vous pouvez supprimer un article, bloquer des commentaires, modifier la catégorie d'un article, en créer et en supprimer`,
      ROLE_WRITTER:
        "Vous pouvez créer des articles,  modifier l'intégralité de vos articles et bloquer les commentaires liés",
      ROLE_USER:
        'Vous pouvez consulter toutes les catégories, tous les articles et les commenter',
    };
    return roles[value];
  }
}
