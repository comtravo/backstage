/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Entity,
  RELATION_OWNED_BY,
  stringifyEntityRef,
} from '@backstage/catalog-model';
import { EntitiesSearchFilter } from '../../catalog/types';
import { CatalogPermissionRule } from '../types';

/**
 * A {@link CatalogPermissionRule} which filters for entities with a specified
 * owner.
 * @public
 */
export const isEntityOwner: CatalogPermissionRule = {
  name: 'IS_ENTITY_OWNER',
  description: 'Allow entities owned by the current user',
  apply: (resource: Entity, claims: string[]) => {
    if (!resource.relations) {
      return false;
    }

    return resource.relations
      .filter(relation => relation.type === RELATION_OWNED_BY)
      .some(relation => claims.includes(stringifyEntityRef(relation.target)));
  },
  toQuery: (claims: string[]): EntitiesSearchFilter => ({
    key: 'relations.ownedBy',
    values: claims,
  }),
};
