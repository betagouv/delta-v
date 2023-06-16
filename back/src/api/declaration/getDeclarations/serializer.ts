import { DeclarationEntity } from '../../../entities/declaration.entity';
import {
  declarationSerializer,
  SerializedDeclaration,
} from '../common/serializer/declarationSerializer';

export interface SerializedGetOneDeclaration {
  declarations: SerializedDeclaration[];
}

export default (declarations: DeclarationEntity[]): SerializedGetOneDeclaration => ({
  declarations: declarations.map(declarationSerializer),
});
