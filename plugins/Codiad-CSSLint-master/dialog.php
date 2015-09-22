<!--
    Copyright (c) Codiad & Andr3as, distributed
    as-is and without warranty under the MIT License. 
    See http://opensource.org/licenses/MIT for more information.
    This information must remain intact.
-->
<form class="settings-csslint">
    <label><span class="icon-gauge big-icon"></span> CSSLint options</label>
    <hr>

    <table class="csslint-options">
        <tr><th colspan="2"><label>Errors</label></th></tr>
        <tr>
            <td><input type="checkbox" name="box-model" class="csslint-option" checked></td>
            <td>Beware of broken box sizing</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="display-property-grouping" class="csslint-option" checked></td>
            <td>Require properties appropriate for display</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="duplicate-properties" class="csslint-option" checked></td>
            <td>Disallow duplicate properties</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="empty-rules" class="csslint-option" checked></td>
            <td>Disallow empty rules</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="known-properties" class="csslint-option" checked></td>
            <td>Require use of known properties</td>
        </tr>
    
        <tr><th colspan="2"><label>Compatibility</label></th></tr>
        <tr>
            <td><input type="checkbox" name="adjoining-classes" class="csslint-option" checked></td>
            <td>Disallow adjoining classes</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="box-sizing" class="csslint-option" checked></td>
            <td>Disallow box-sizing</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="compatible-vendor-prefixes" class="csslint-option" checked></td>
            <td>Require compatible vendor prefixes</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="gradients" class="csslint-option" checked></td>
            <td>Require all gradient definitions</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="text-indent" class="csslint-option" checked></td>
            <td>Disallow negative text-indent</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="vendor-prefix" class="csslint-option" checked></td>
            <td>Require standard property with vendor prefix</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="fallback-colors" class="csslint-option" checked></td>
            <td>Require fallback colors</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="star-property-hack" class="csslint-option" checked></td>
            <td>Disallow star hack</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="underscore-property-hack" class="csslint-option" checked></td>
            <td>Disallow underscore hack</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="bulletproof-font-face" class="csslint-option" checked></td>
            <td>Bullet-proof @font-face(New)</td>
        </tr>
    </table>

    <table class="csslint-options">
        <tr><th colspan="2"><label>Performance</label></th></tr>
        <tr>
            <td><input type="checkbox" name="font-faces" class="csslint-option" checked></td>
            <td>Don't use too many web fonts</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="import" class="csslint-option" checked></td>
            <td>Disallow @import</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="duplicate-background-images" class="csslint-option" checked></td>
            <td>Disallow duplicate background images</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="regex-selectors" class="csslint-option" checked></td>
            <td>Disallow selectors that look like regexs</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="universal-selector" class="csslint-option" checked></td>
            <td>Disallow universal selector</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="unqualified-attributes" class="csslint-option" checked></td>
            <td>Disallow unqualified attribute selectors</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="zero-units" class="csslint-option" checked></td>
            <td>Disallow units for 0 values</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="overqualified-elements" class="csslint-option" checked></td>
            <td>Disallow overqualified elements</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="shorthand" class="csslint-option" checked></td>
            <td>Require shorthand properties</td>
        </tr>

        <tr><th colspan="2"><label>Maintainability & Duplication</label></th></tr>
        <tr>
            <td><input type="checkbox" name="floats" class="csslint-option" checked></td>
            <td>Disallow too many floats</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="font-sizes" class="csslint-option" checked></td>
            <td>Don't use too many font sizes</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="ids" class="csslint-option" checked></td>
            <td>Disallow IDs in selectors</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="important" class="csslint-option" checked></td>
            <td>Disallow !important</td>
        </tr>

        <tr><th colspan="2"><label>Accessibility</label></th></tr>
        <tr>
            <td><input type="checkbox" name="outline-none" class="csslint-option" checked></td>
            <td>Disallow outline:none</td>
        </tr>
    </table>

    <table class="csslint-options">
        <tr><th colspan="2"><label>OOCSS</label></th></tr>
        <tr>
            <td><input type="checkbox" name="qualified-headings" class="csslint-option" checked></td>
            <td>Disallow qualified headings</td>
        </tr>
        <tr>
            <td><input type="checkbox" name="unique-headings" class="csslint-option" checked></td>
            <td>Heading should only be defined once</td>
        </tr>
    </table>

    <br>

    <p>Check <a href="https://github.com/CSSLint/csslint/wiki/Rules" target="_blank">CSSLint</a> for more details.</p>
	<p>Global settings are overwritten by local .csslintrc files.</p>
</form>